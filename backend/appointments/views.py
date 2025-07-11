from config.settings import PAGINATION_PARAMETER

from django.shortcuts import get_object_or_404

from administrators.models import Administrator
from config.settings import DEFAULT_VALUE, EMAIL_DATE_FORMAT, PATIENT_QUERY_PARAMETER

from rest_framework import status, views, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mixins.emails import EmailMixin
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from patients.models import Patient
from permissions.decorators import method_permission_classes
from permissions.patients import (
    IsAdministratorOrIsPatientAssignedDoctor,
    IsAdministratorOrIsPatientAssignedDoctorOrIsSelf,
)
from permissions.users import IsDoctor
from .serializers import (
    AppointmentUpsetSerializer,
    AppointmentPreviewSerializer,
    AppointmentCalendarSerializer,
    AppointmentDetailSerializer,
)
from doctors.models import Doctor
from .models import Appointment
from .exceptions import AppointmentException
from .algorithm import solve


class CancelAppointmentAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        appointment = Appointment.objects.filter(id=kwargs.get("id")).first()

        if not appointment:
            return Response(status=status.HTTP_404_NOT_FOUND)

        appointment.status = Appointment.STATUS_CANCELLED
        appointment.save()

        return Response(
            {"message": "The appointment has been successfully cancelled."},
            status=status.HTTP_200_OK,
        )


class AppointmentCalendarAPIView(views.APIView):
    permission_classes = [IsAuthenticated, IsDoctor]
    serializer_class = AppointmentCalendarSerializer

    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.filter(doctor=request.user)
        return Response(
            self.serializer_class(appointments, many=True).data,
            status=status.HTTP_200_OK,
        )


class ListAppointmentsByPatientAPIView(views.APIView, SearchMixin, PaginationMixin):
    permission_classes = [
        IsAuthenticated,
        IsAdministratorOrIsPatientAssignedDoctorOrIsSelf,
    ]
    model = Appointment
    list_serializer_class = AppointmentPreviewSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.search(
            Appointment,
            request,
            base_queryset=self.model.objects.filter(
                patient_id=kwargs.get("patient_id")
            ),
        )

        if request.query_params.get(PAGINATION_PARAMETER, None):
            return self.get_paginated_response_(
                request, queryset, self.list_serializer_class
            )

        return Response(
            self.list_serializer_class(queryset, many=True).data,
            status=status.HTTP_200_OK,
        )


class AppointmentViewSet(
    viewsets.GenericViewSet,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
    EmailMixin,
):
    upset_serializer_class = AppointmentUpsetSerializer
    list_serializer_class = AppointmentPreviewSerializer
    serializer_class = AppointmentDetailSerializer
    model = Appointment

    def get_object(self):
        return get_object_or_404(
            self.model,
            id=self.kwargs.get("pk"),
        )

    @method_permission_classes([IsAuthenticated])
    def create(self, request, *args, **kwargs):
        serializer = self.upset_serializer_class(data=request.data)

        if not serializer.is_valid():
            return self.handle_serializer_is_not_valid_response(serializer)

        appointment = serializer.save()

        try:
            solve(
                request.user.id,
                request.data,
                appointment,
            )

            self.send_email(
                template_path="emails/appointment_confirmed_template.html",
                email=appointment.patient.email,
                subject="Medical appointment confirmed",
                context={
                    "first_name": appointment.patient.first_name,
                    "last_name": appointment.patient.last_name,
                    "url": appointment.generate_google_calendar_event(),
                    "date": appointment.schedule.start_time.strftime(EMAIL_DATE_FORMAT),
                    "doctor": f"{appointment.doctor.first_name} {appointment.doctor.last_name}",
                    "medical_specialty": getattr(
                        getattr(appointment, "medical_specialty", None),
                        "name",
                        DEFAULT_VALUE,
                    ),
                    "location": f"{appointment.room.name} ({appointment.room.location})",
                },
            )

            return Response(
                {
                    "message": "The appointment has been assigned, check your inbox or the 'Appointments' section."
                },
                status=status.HTTP_200_OK,
            )
        except AppointmentException as exception:
            appointment.delete()

            return Response(
                {"detail": str(exception)}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as exception:
            appointment.delete()

            print(exception)

            return Response(
                {"detail": "A server error occurred. Please, try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @method_permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        if Doctor.objects.filter(id=request.user.id).exists():
            base_queryset = self.model.objects.filter(doctor_id=request.user.id)
        elif Patient.objects.filter(id=request.user.id).exists():
            base_queryset = self.model.objects.filter(patient_id=request.user.id)
        else:
            base_queryset = self.model.objects.all()

        queryset = self.search(self.model, request, base_queryset=base_queryset)

        return self.get_paginated_response_(
            request, queryset, self.list_serializer_class
        )

    @method_permission_classes([IsAuthenticated])
    def retrieve(self, request, *args, **kwargs):
        appointment = self.get_object()

        if (
            Patient.objects.filter(id=request.user.id).exists()
            or not Administrator.objects.filter(id=request.user.id).exists()
            and not self.model.objects.filter(
                patient_id=appointment.patient.id, doctor_id=request.user.id
            ).exists()
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)

        return Response(
            self.serializer_class(appointment).data, status=status.HTTP_200_OK
        )

    @method_permission_classes([IsAuthenticated])
    def partial_update(self, request, *args, **kwargs):
        appointment = self.get_object()

        if (
            Patient.objects.filter(id=request.user.id).exists()
            or not Administrator.objects.filter(id=request.user.id).exists()
            and not self.model.objects.filter(
                patient_id=appointment.patient.id, doctor_id=request.user.id
            ).exists()
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = self.upset_serializer_class(
            appointment, data=request.data, partial=True
        )

        if not serializer.is_valid():
            return self.handle_serializer_is_not_valid_response(serializer)

        serializer.save()
        return Response(
            {"message": "The status of the appointment has been updated."},
            status=status.HTTP_200_OK,
        )

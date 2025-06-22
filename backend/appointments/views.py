from config.settings import (
    DEFAULT_VALUE,
    EMAIL_DATE_FORMAT
)

from rest_framework import (
    status,
    views,
    viewsets
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mixins.emails import EmailMixin
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from patients.models import Patient
from permissions.decorators import method_permission_classes
from permissions.users import IsDoctor
from .serializers import (
    CreateAppointmentSerializer,
    AppointmentPreviewSerializer,
    AppointmentCalendarSerializer
)
from doctors.models import Doctor
from .models import Appointment
from .exceptions import AppointmentException
from .algorithm import solve


class CancelAppointmentAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        appointment = Appointment.objects.filter(
            id=kwargs.get("id")
        ).first()

        if not appointment:
            return Response(status=status.HTTP_404_NOT_FOUND)

        appointment.status = Appointment.STATUS_CANCELLED
        appointment.save()

        return Response(
            {"message": "The appointment has been successfully cancelled."},
            status=status.HTTP_200_OK
        )


class AppointmentCalendarAPIView(views.APIView):
    permission_classes = [IsAuthenticated, IsDoctor]
    serializer_class = AppointmentCalendarSerializer

    def get(self, request, *args, **kwargs):
        appointments = Appointment.objects.filter(doctor=request.user)
        return Response(
            self.serializer_class(appointments, many=True).data,
            status=status.HTTP_200_OK
        )


class AppointmentViewSet(
    viewsets.GenericViewSet,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
    EmailMixin
):
    serializer_class = CreateAppointmentSerializer
    list_serializer_class = AppointmentPreviewSerializer
    model = Appointment

    @method_permission_classes([IsAuthenticated])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

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
                        getattr(appointment, "medical_specialty", None), "name",
                        DEFAULT_VALUE
                    ),
                    "location": f"{appointment.room.name} ({appointment.room.location})",
                }
            )

            return Response(
                {"message": "The appointment has been assigned, check your inbox or the 'Appointments' section."},
                status=status.HTTP_200_OK
            )
        except AppointmentException as exception:
            appointment.delete()

            return Response(
                {"detail": str(exception)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @method_permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        if Doctor.objects.filter(id=request.user.id).exists():
            base_queryset = self.model.objects.filter(doctor_id=request.user.id)
        elif Patient.objects.filter(id=request.user.id).exists():
            base_queryset = self.model.objects.filter(patient_id=request.user.id)
        else:
            base_queryset = self.model.objects.all()

        queryset = self.search(
            self.model,
            request,
            base_queryset=base_queryset
        )

        return self.get_paginated_response_(
            request,
            queryset,
            self.list_serializer_class
        )

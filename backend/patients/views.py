from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    PatientPreviewSerializer,
    PatientSerializer
)
from permissions.decorators import method_permission_classes
from permissions.users import IsDoctorOrIsAdministrator
from permissions.patients import IsAdministratorOrIsPatientAssignedDoctorOrIsSelf
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from mixins.emails import EmailMixin
from patients.models import Patient
from doctors.models import Doctor


class PatientViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
    EmailMixin
):
    lookup_field = 'id'
    model = Patient
    queryset = None
    list_serializer_class = PatientPreviewSerializer
    serializer_class = PatientSerializer

    def get_object(self):
        return get_object_or_404(self.model, id=self.kwargs['id'])

    @method_permission_classes([IsAuthenticated, IsDoctorOrIsAdministrator])
    def list(self, request, *args, **kwargs):
        base_queryset = (Doctor.objects.filter(id=request.user.id).exists() and
                         self.model.objects.filter(primary_doctor_id=request.user.id))

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

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientAssignedDoctorOrIsSelf])
    def partial_update(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            self.get_object(),
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Changes saved.'},
                status=status.HTTP_200_OK
            )

        return self.handle_serializer_is_not_valid_response(serializer)

    @method_permission_classes([IsAuthenticated, IsDoctorOrIsAdministrator])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            patient, random_password = serializer.save()

            self.send_email(
                'emails/sign_up_email_template.html',
                patient.email,
                'Sign up',
                {
                    'first_name': patient.first_name,
                    'last_name': patient.last_name,
                    'username': patient.identity_card_number,
                    'password': random_password
                }
            )

            return Response(
                {'message': 'Patient created successfully.'},
                status=status.HTTP_201_CREATED
            )

        return self.handle_serializer_is_not_valid_response(serializer)

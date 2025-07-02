from config.settings import PATIENT_QUERY_PARAMETER

from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import (
    status,
    viewsets,
    mixins,
)
from rest_framework.status import HTTP_403_FORBIDDEN

from .serializers import (
    MedicalTestSerializer,
    MedicalTestPreviewSerializer,
)
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.patients import IsAdministratorOrIsPatientOrIsPatientAssignedDoctor, IsPatientAssignedDoctor
from permissions.users import IsDoctor
from patients.models import Patient
from doctors.models import Doctor
from .models import MedicalTest


class MedicalTestViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin
):
    model = MedicalTest
    queryset = None
    list_serializer_class = MedicalTestPreviewSerializer
    serializer_class = MedicalTestSerializer

    def get_object(self):
        return get_object_or_404(
            self.model,
            id=self.kwargs.get("pk")
        )

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientOrIsPatientAssignedDoctor])
    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        patient_id = request.query_params.get(PATIENT_QUERY_PARAMETER)

        if Patient.objects.filter(id=user_id).exists():
            if patient_id:
                if int(patient_id) != user_id:
                    return Response(status=HTTP_403_FORBIDDEN)
                base_queryset = self.model.objects.filter(patient=user_id)
            else:
                base_queryset = self.model.objects.filter(patient=user_id)
        elif Doctor.objects.filter(id=user_id).exists():
            base_queryset = self.model.objects.filter(patient=patient_id)
        else:
            if patient_id:
                base_queryset = self.model.objects.filter(patient=patient_id)
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

    @method_permission_classes([IsAuthenticated, IsPatientAssignedDoctor])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Medical test created.'},
                status=status.HTTP_201_CREATED
            )

        return self.handle_serializer_is_not_valid_response(serializer)

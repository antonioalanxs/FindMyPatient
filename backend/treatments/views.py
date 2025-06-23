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
    TreatmentSerializer,
    TreatmentPreviewSerializer,
)
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.patients import IsAdministratorOrIsPatientOrIsPatientAssignedDoctor
from permissions.users import IsDoctor
from patients.models import Patient
from doctors.models import Doctor
from .models import Treatment


class TreatmentViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin
):
    model = Treatment
    queryset = None
    list_serializer_class = TreatmentPreviewSerializer
    serializer_class = TreatmentSerializer

    def get_object(self):
        return get_object_or_404(
            self.model,
            id=self.kwargs.get("pk")
        )

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientOrIsPatientAssignedDoctor])
    def list(self, request, *args, **kwargs):
        if Patient.objects.filter(id=request.user.id).exists():
            if patient_id := request.query_params.get('patient', None):
                if int(patient_id) == int(request.user.id):
                    base_queryset = self.model.objects.filter(patient=request.user.id)
                else:
                    return Response(status=HTTP_403_FORBIDDEN)
            else:
                base_queryset = self.model.objects.filter(patient=request.user.id)
        elif Doctor.objects.filter(id=request.user.id).exists():
            patient_id = request.query_params.get('patient', None)
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

    @method_permission_classes([IsAuthenticated, IsDoctor])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Medical treatment created.'},
                status=status.HTTP_201_CREATED
            )

        return self.handle_serializer_is_not_valid_response(serializer)

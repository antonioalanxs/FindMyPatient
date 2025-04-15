from config.settings import PAGINATION_PARAMETER

from django.shortcuts import get_object_or_404

from rest_framework import (
    status,
    viewsets,
    mixins,
    views
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from mixins.pagination import PaginationMixin
from mixins.search import SearchMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from doctors.models import Doctor
from patients.models import Patient
from patients.serializers import PatientPreviewSerializer
from .serializers import (
    DoctorSerializer,
    DoctorCompressSerializer,
    DoctorPreviewSerializer
)
from permissions.decorators import method_permission_classes
from permissions.users import (
    IsAdministratorOrIsSelf,
    IsDoctorOrIsAdministrator,
)
from permissions.doctors import (
    IsAdministratorOrIsDoctorAssignedPatient,
    IsAdministratorOrIsDoctorAndIsSelf
)


class ListPatientsByDoctorAPIView(
    views.APIView,
    SearchMixin,
    PaginationMixin
):
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsAdministratorOrIsDoctorAndIsSelf]

    def get(self, request, *args, **kwargs):
        doctor = get_object_or_404(
            Doctor,
            id=self.kwargs.get("id")
        )

        queryset = self.search(
            Patient,
            request,
            base_queryset=doctor.patients.all()
        )

        return self.get_paginated_response_(
            request,
            queryset,
            PatientPreviewSerializer
        )


class DoctorViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
):
    lookup_field = 'id'
    model = Doctor
    queryset = None
    compress_serializer_class = DoctorCompressSerializer
    list_serializer_class = DoctorPreviewSerializer
    serializer_class = DoctorSerializer

    def get_object(self):
        return get_object_or_404(self.model, id=self.kwargs['id'])

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsSelf])
    def partial_update(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            self.get_object(),
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

        return self.handle_serializer_is_not_valid_response(serializer)

    @method_permission_classes([IsAuthenticated, IsDoctorOrIsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(self.model, request)

        if request.query_params.get(PAGINATION_PARAMETER, None):
            return self.get_paginated_response_(
                request,
                queryset,
                self.list_serializer_class
            )

        return Response(
            self.compress_serializer_class(queryset, many=True).data,
            status=status.HTTP_200_OK
        )

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsDoctorAssignedPatient])
    def retrieve(self, request, *args, **kwargs):
        return Response(
            self.serializer_class(self.get_object()).data,
            status=status.HTTP_200_OK
        )

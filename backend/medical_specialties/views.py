from config.settings import PAGINATION_PARAMETER

from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import (
    status,
    viewsets,
    mixins,
    views
)

from .serializers import (
    MedicalSpecialtySerializer,
    MedicalSpecialtyPreviewSerializer,
    MedicalSpecialtyCompressSerializer
)
from doctors.serializers import DoctorPreviewSerializer
from .models import MedicalSpecialty
from doctors.models import Doctor
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator


class ListDoctorsByMedicalSpecialtyAPIView(
    views.APIView,
    SearchMixin,
    PaginationMixin
):
    permission_classes = [IsAuthenticated, IsAdministrator]

    def get(self, request, *args, **kwargs):
        medical_specialty = get_object_or_404(
            MedicalSpecialty,
            id=self.kwargs.get("pk")
        )

        queryset = self.search(
            Doctor,
            request,
            base_queryset=medical_specialty.doctor_set.all()
        )

        return self.get_paginated_response_(
            request,
            queryset,
            DoctorPreviewSerializer
        )


class MedicalSpecialtyViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin
):
    model = MedicalSpecialty
    queryset = None
    list_serializer_class = MedicalSpecialtyPreviewSerializer
    serializer_class = MedicalSpecialtySerializer
    compress_serializer_class = MedicalSpecialtyCompressSerializer

    def get_object(self):
        return get_object_or_404(
            self.model,
            id=self.kwargs.get("pk")
        )

    @method_permission_classes([IsAuthenticated, IsAdministrator])
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

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def retrieve(self, request, *args, **kwargs):
        medical_specialty = self.get_object()
        serializer = self.serializer_class(medical_specialty)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @method_permission_classes([IsAuthenticated, IsAdministrator])
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

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Medical specialty created.'},
                status=status.HTTP_201_CREATED
            )

        return self.handle_serializer_is_not_valid_response(serializer)

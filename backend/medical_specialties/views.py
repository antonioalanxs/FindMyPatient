from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins, views

from .serializers import MedicalSpecialtySerializer
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
    serializer_class = MedicalSpecialtySerializer

    def get_object(self):
        return get_object_or_404(
            self.model,
            id=self.kwargs.get("pk")
        )

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(self.model, request)
        return self.get_paginated_response_(
            request,
            queryset,
            self.serializer_class
        )

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def retrieve(self, request, *args, **kwargs):
        medical_specialty = self.get_object()
        serializer = self.serializer_class(medical_specialty)
        return Response(serializer.data, status=status.HTTP_200_OK)

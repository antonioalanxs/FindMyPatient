from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

from .serializers import MedicalSpecialtySerializer
from .models import MedicalSpecialty
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator


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

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(self.model, request)
        return self.get_paginated_response_(
            request,
            queryset,
            self.serializer_class
        )

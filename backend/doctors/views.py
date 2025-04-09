from config.settings import PAGINATION_PARAMETER

from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from mixins.pagination import PaginationMixin
from mixins.search import SearchMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from .serializers import (
    DoctorUpdateSerializer,
    DoctorCompressSerializer,
    DoctorPreviewSerializer
)
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministratorOrIsSelf, IsDoctorOrIsAdministrator
from doctors.models import Doctor


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

    def get_object(self):
        return get_object_or_404(self.model, id=self.kwargs['id'])

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsSelf])
    def partial_update(self, request, *args, **kwargs):
        serializer = DoctorUpdateSerializer(
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
    def list(self, request, *args, **kwargs):
        queryset = self.search(self.model, request)

        if request.query_params.get(PAGINATION_PARAMETER, None):
            return self.get_paginated_response_(
                request,
                queryset,
                DoctorPreviewSerializer
            )

        return Response(
            DoctorCompressSerializer(queryset, many=True).data,
            status=status.HTTP_200_OK
        )

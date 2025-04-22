from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework import (
    viewsets,
    mixins
)

from .serializers import (
    RoomPreviewSerializer,
)
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator
from rooms.models import Room


class RoomViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin
):
    model = Room
    queryset = None
    list_serializer_class = RoomPreviewSerializer

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
            self.list_serializer_class
        )

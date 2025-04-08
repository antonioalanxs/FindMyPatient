from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Administrator
from .serializers import AdministratorPreviewSerializer
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin


class AdministratorViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
):
    lookup_field = 'id'
    model = Administrator
    queryset = None

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(
            self.model,
            request,
        )

        return self.get_paginated_response_(
            request,
            queryset,
            AdministratorPreviewSerializer
        )

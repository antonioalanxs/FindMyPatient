from django.contrib.auth.models import Group

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets

from .serializers import GroupSerializer
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator


class GroupViewSet(
    viewsets.GenericViewSet,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin
):
    model = Group
    queryset = None
    serializer_class = GroupSerializer

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(self.model, request)
        return self.get_paginated_response_(
            request,
            queryset,
            self.serializer_class
        )

from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Administrator
from .serializers import (
    AdministratorPreviewSerializer,
    AdministratorSerializer
)
from permissions.decorators import method_permission_classes
from permissions.users import IsAdministrator
from mixins.search import SearchMixin
from mixins.pagination import PaginationMixin
from mixins.serializers import SerializerValidationErrorResponseMixin
from mixins.emails import EmailMixin


class AdministratorViewSet(
    viewsets.GenericViewSet,
    mixins.DestroyModelMixin,
    SearchMixin,
    PaginationMixin,
    SerializerValidationErrorResponseMixin,
    EmailMixin
):
    lookup_field = 'id'
    model = Administrator
    queryset = None
    list_serializer_class = AdministratorPreviewSerializer
    serializer_class = AdministratorSerializer

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def list(self, request, *args, **kwargs):
        queryset = self.search(
            self.model,
            request,
        )

        return self.get_paginated_response_(
            request,
            queryset,
            self.list_serializer_class
        )

    @method_permission_classes([IsAuthenticated, IsAdministrator])
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            administrator, random_password = serializer.save()

            self.send_email(
                'emails/sign_up_email_template.html',
                administrator.email,
                'Sign up',
                {
                    'first_name': administrator.first_name,
                    'last_name': administrator.last_name,
                    'username': administrator.identity_card_number,
                    'password': random_password
                }
            )

            return Response(
                {'message': 'Administrator created successfully.'},
                status=status.HTTP_201_CREATED
            )

        return self.handle_serializer_is_not_valid_response(serializer)

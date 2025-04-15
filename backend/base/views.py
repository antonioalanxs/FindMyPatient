from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

from base.models import User
from base.serializers import UserSerializer
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.patients import (
    IsAdministratorOrIsPatientAssignedDoctorOrIsSelf,
    IsAdministratorOrIsPatientAssignedDoctor
)


class UserViewSet(viewsets.GenericViewSet, mixins.DestroyModelMixin, SerializerValidationErrorResponseMixin):
    lookup_field = 'id'
    model = User
    queryset = None
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(self.model, id=self.kwargs['id'])

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientAssignedDoctorOrIsSelf])
    def retrieve(self, request, *args, **kwargs):
        return Response(
            self.serializer_class(self.get_object()).data,
            status=status.HTTP_200_OK
        )

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientAssignedDoctorOrIsSelf])
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

    @method_permission_classes([IsAuthenticated, IsAdministratorOrIsPatientAssignedDoctor])
    def destroy(self, request, *args, **kwargs):
        if request.user.id == int(self.kwargs['id']):
            return Response(
                {'detail': 'You cannot delete yourself.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

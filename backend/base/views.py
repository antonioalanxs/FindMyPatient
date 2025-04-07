from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets

from base.models import User
from base.serializers import UserSerializer
from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.decorators import method_permission_classes
from permissions.patients import IsAdministratorOrIsPatientAssignedDoctorOrIsSelf


class UserViewSet(viewsets.GenericViewSet, SerializerValidationErrorResponseMixin):
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
            return Response(
                {'message': 'Changes saved.'},
                status=status.HTTP_200_OK
            )

        return self.handle_serializer_is_not_valid_response(serializer)

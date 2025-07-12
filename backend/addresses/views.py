from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from mixins.serializers import SerializerValidationErrorResponseMixin
from permissions.patients import IsAdministratorOrIsPatientAssignedDoctorOrIsSelf
from addresses.models import Address
from patients.models import Patient
from .serializers import AddressSerializer


class AddressRetrieveUpdateAPIView(RetrieveUpdateAPIView, SerializerValidationErrorResponseMixin):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, IsAdministratorOrIsPatientAssignedDoctorOrIsSelf]

    def get(self, request, *args, **kwargs):
        patient = get_object_or_404(Patient, id=kwargs.get('id'))

        return Response(
            self.serializer_class(patient.address).data,
            status=status.HTTP_200_OK
        )

    def partial_update(self, request, *args, **kwargs):
        patient = get_object_or_404(Patient, id=kwargs.get('id'))

        serializer = self.serializer_class(
            patient.address,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Address updated successfully.'}, status=status.HTTP_200_OK)

        return self.handle_serializer_is_not_valid_response(serializer)

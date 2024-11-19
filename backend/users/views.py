from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from users.models import Patient
from utilities.permissions import IsPatient


@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsPatient])
def change_address(request, *args, **kwargs):
    user = Patient.objects.get(id=request.user.id)

    user.street = request.data.get('street', user.street)
    user.city = request.data.get('city', user.city)
    user.state = request.data.get('state', user.state)
    user.country = request.data.get('country', user.country)
    user.zip_code = request.data.get('zip_code', user.zip_code)

    user.save()

    return Response(status=status.HTTP_200_OK, data={
        'message': 'Address updated successfully.',
    })

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from utilities.permissions import IsPatient
from users.models import Patient
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsPatient])
def update_patient_location(request):
    print(request)
    return Response(status=status.HTTP_200_OK)

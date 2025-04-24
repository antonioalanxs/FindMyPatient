from rest_framework import (
    views,
    status
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class RequestAppointmentAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response(
            {"message": "Appointment requested successfully! Check your inbox."},
            status=status.HTTP_200_OK
        )

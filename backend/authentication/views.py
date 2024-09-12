from django.contrib.auth import authenticate

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView

from jwt_.serializers import CustomTokenObtainPairSerializer


# Create your views here.


class LoginView(TokenObtainPairView):
    @swagger_auto_schema(
        operation_summary="Handles user login.",
        operation_description="Provides access and refresh tokens for an user.",
        request_body=CustomTokenObtainPairSerializer,
        manual_parameters=[],
        responses={
            200: openapi.Response(
                description="User successfully logged in.",
                examples={
                    "application/json": {
                        "accessToken": "accessTokenExample",
                        "refreshToken": "refreshTokenExample",
                    }
                }
            ),
            400: openapi.Response(
                description="Bad Request.",
                examples={
                    "application/json": {
                        "message": "Invalid credentials."
                    }
                }
            )
        }
    )
    def post(self, request, **kwargs):
        if authenticate(**request.data) is not None:
            serializer = CustomTokenObtainPairSerializer(data=request.data)
            if serializer.is_valid():
                return Response(
                    {
                        "access_token": serializer.validated_data.get("access"),
                        "refresh_token": serializer.validated_data.get("refresh")
                    },
                    status=status.HTTP_200_OK
                )
        return Response(
            {"message": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED
        )

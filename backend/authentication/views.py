from django.conf import settings
from django.contrib.auth import get_user_model

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from jwt_.serializers import CustomTokenObtainPairSerializer

from .mixins import URIEmailMixin, URICertifierMixin

User = get_user_model()


# Create your views here.


class LoginView(TokenObtainPairView):
    @swagger_auto_schema(
        operation_summary='Handles user login.',
        operation_description='Provides access and refresh tokens for an user.',
        request_body=CustomTokenObtainPairSerializer,
        manual_parameters=[],
        responses={
            200: openapi.Response(
                description='User successfully logged in.',
                examples={
                    'application/json': {
                        'accessToken': 'accessTokenExample',
                        'refreshToken': 'refreshTokenExample',
                    }
                }
            ),
            400: openapi.Response(
                description='Bad Request.',
                examples={
                    'application/json': {
                        'message': 'Invalid credentials.'
                    }
                }
            )
        }
    )
    def post(self, request, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {
                    'access_token': serializer.validated_data.get('access'),
                    'refresh_token': serializer.validated_data.get('refresh')
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {'message': 'Invalid credentials.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class PasswordResetRequestView(APIView, URIEmailMixin):
    @swagger_auto_schema(
        operation_summary='Handles password reset request.',
        operation_description='Sends an email to the user with a link to reset the password.',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The user email.'
                )
            }
        ),
        manual_parameters=[],
        responses={
            200: openapi.Response(
                description='Email successfully sent.',
                examples={
                    'application/json': {
                        'message': 'Email successfully sent.'
                    }
                }
            ),
            404: openapi.Response(
                description='Introduced email not found.',
                examples={
                    'application/json': {
                        'email': 'Introduced email does not exist.'
                    }
                }
            )
        }
    )
    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()

        if user:
            self.send_email(
                user,
                'reset_password_token',
                settings.RESET_PASSWORD_CLIENT_URL,
                'Password reset request',
                'emails/password_reset_request_email_template.html'
            )

            return Response(
                {'message': 'Email successfully sent.'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'message': 'Introduced email does not exist.'},
            status=status.HTTP_404_NOT_FOUND
        )


class PasswordResetView(APIView, URICertifierMixin):
    @swagger_auto_schema(
        operation_summary='Handles password reset.',
        operation_description='Resets the user password.',
        manual_parameters=[
            openapi.Parameter(
                name='token',
                in_=openapi.IN_PATH,
                type=openapi.TYPE_STRING,
                required=True,
                description='The password reset token.',
            ),
        ],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'password': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The new password.'
                )
            }
        ),
        responses={
            200: openapi.Response(
                description='Password successfully reset.',
                examples={
                    'application/json': {
                        'message': 'Password successfully reset.'
                    }
                }
            ),
            400: openapi.Response(
                description='Invalid token.',
                examples={
                    'application/json': {
                        'detail': 'Invalid token.'
                    }
                }
            )
        }
    )
    def put(self, request, token):
        user = self.is_legal('reset_password_token', token)

        if user:
            user.set_password(request.data['password'])
            user.save()

            return Response(
                {'message': 'Password successfully reset.'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'message': 'Invalid token.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    @swagger_auto_schema(
        operation_summary="Checks if the password reset token is valid.",
        operation_description="Checks if the password reset token is valid.",
        request_body=None,
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_PATH,
                type=openapi.TYPE_STRING,
                required=True,
                description="The password reset token.",
            ),
        ],
        responses={
            200: openapi.Response(
                description="If the password reset token is valid or not.",
                examples={
                    "application/json": {
                        "is_reset_password_token_valid": True
                    }
                }
            )
        }
    )
    def get(self, request, token):
        user = self.is_legal("reset_password_token", token, caducate=False)

        return Response(
            data={"is_reset_password_token_valid": bool(user)},
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Handles user logout.",
        operation_description="Invalidates the refresh token and waits for the access token expiration.\n\nThe refresh token is automatically invalidated and added to the blacklist when `RefreshToken.for_user(user)` is called. This process also generates a new one, but it is not provided and expires over time.\n\nThe access token must be provided in the request header.",
        request_body=None,
        manual_parameters=[],
        security=[{"Bearer": []}],
        responses={
            200: openapi.Response(
                description="User successfully logged out.",
                examples={
                    "application/json": {
                        "message": "User successfully logged out."
                    }
                }
            ),
            401: openapi.Response(
                description="Unauthorized.",
                examples={
                    "application/json": [
                        {
                            "detail": "Authentication credentials were not provided."
                        },
                        {
                            "detail": "Given token not valid for any token type",
                            "code": "token_not_valid",
                            "messages": [
                                {
                                    "token_class": "AccessToken",
                                    "token_type": "access",
                                    "message": "Token is invalid or expired"
                                }
                            ]
                        }
                    ]
                }
            )
        }
    )
    def post(self, request):
        RefreshToken.for_user(request.user).blacklist()

        return Response(
            {"message": "User successfully logged out."},
            status=status.HTTP_200_OK
        )


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary='Handles password change.',
        operation_description='Changes the user password. The old password must be provided to change it.',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'old_password': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The old password.'
                ),
                'new_password': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='The new password.'
                )
            }
        ),
        manual_parameters=[],
        responses={
            200: openapi.Response(
                description='Password successfully changed.',
                examples={
                    'application/json': {
                        'message': 'Password successfully changed!'
                    }
                }
            ),
            401: openapi.Response(
                description="Unauthorized.",
                examples={
                    "application/json": [
                        {
                            "detail": "Authentication credentials were not provided."
                        },
                        {
                            "detail": "Given token not valid for any token type",
                            "code": "token_not_valid",
                            "messages": [
                                {
                                    "token_class": "AccessToken",
                                    "token_type": "access",
                                    "message": "Token is invalid or expired"
                                }
                            ]
                        }
                    ]
                }
            ),
            400: openapi.Response(
                description='Old password is incorrect.',
                examples={
                    'application/json': {
                        'detail': 'Old password is incorrect.'
                    }
                }
            )
        }
    )
    def put(self, request):
        user = request.user

        if not user.check_password(request.data['old_password']):
            return Response(
                {'detail': 'Old password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(request.data['new_password'])
        user.save()

        return Response(
            {'message': 'Password successfully changed!'},
            status=status.HTTP_200_OK
        )

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView

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
        if authenticate(**request.data) is not None:
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
        manual_parameters=None,
        responses={
            200: openapi.Response(
                description='Email successfully sent.',
                examples={
                    'application/json': {
                        'message': 'Email successfully sent.'
                    }
                }
            ),
            400: openapi.Response(
                description='Introduced email does not exist.',
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
            status=status.HTTP_400_BAD_REQUEST
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
        operation_summary='Checks if the password reset token is valid.',
        operation_description='Checks if the password reset token is valid.',
        request_body=None,
        manual_parameters=[
            openapi.Parameter(
                name='token',
                in_=openapi.IN_PATH,
                type=openapi.TYPE_STRING,
                required=True,
                description='The password reset token.',
            ),
        ],
        responses={
            200: openapi.Response(
                description='If the password reset token is valid or not.',
                examples={
                    'application/json': {
                        'is_reset_password_token_valid': True
                    }
                }
            )
        }
    )
    def get(self, request, token):
        return Response(
            data=
            {
                'is_reset_password_token_valid': bool(
                    self.is_legal('reset_password_token', token, caducate=False)
                )
            },
            status=status.HTTP_200_OK
        )

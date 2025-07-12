from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from jwt_.serializers import CustomTokenObtainPairSerializer

from mixins.uris import URIMixin

User = get_user_model()


# Create your views here.


class LoginView(TokenObtainPairView):
    def post(self, request, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)

            return Response(
                {
                    'access_token': serializer.validated_data.get('access'),
                    'refresh_token': serializer.validated_data.get('refresh')
                },
                status=status.HTTP_200_OK
            )
        except Exception as exception:
            return Response(
                {
                    'detail': 'Username or password is incorrect.',
                    'exception': str(exception)
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetRequestView(APIView, URIMixin):
    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()

        if user:
            self.send(
                'Password reset request',
                {
                    'user': user,
                    'token_name': 'reset_password_token',
                    'link': settings.RESET_PASSWORD_CLIENT_URL
                }
            )

            return Response(
                {'message': 'Email sent successfully. Check your inbox.'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'detail': 'Introduced email does not exist.'},
            status=status.HTTP_400_BAD_REQUEST
        )


class PasswordResetView(APIView, URIMixin):
    def put(self, request, token):
        user = self.is_legal(token)

        if user:
            user.set_password(request.data['password'])
            user.save()

            return Response(
                {'message': 'Password successfully reset.'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'detail': 'Expired credentials. Please, request a new password reset.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request, token):
        user = self.is_legal(token, caducate=False)

        if user:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        RefreshToken.for_user(request.user).blacklist()

        return Response(
            {'message': 'You have been logged out successfully.'},
            status=status.HTTP_200_OK
        )


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

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
            {'message': 'Password successfully changed.'},
            status=status.HTTP_200_OK
        )

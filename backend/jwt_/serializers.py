from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from base.serializers import UserSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining a JSON Web Token pair and return more data in responses.
    """

    @classmethod
    def get_token(cls, user):
        """
            Customizes the token payload to include additional user information.

            Parameters:
                - cls (CustomTokenObtainPairSerializer): The class itself.
                - user (users.User): The user for which the token is being generated.

            Returns:
                - dict: The token payload with additional user information.
        """
        token = super().get_token(user)

        data = UserSerializer(user).data.items()

        for key, value in data:
            token[key] = value

        return token

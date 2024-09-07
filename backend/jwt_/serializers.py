from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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

        token["id"] = user.id
        token["username"] = user.username

        return token

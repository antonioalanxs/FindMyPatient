from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class for the User model.

    Attributes:
        role (str): The role of the user.
    """
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = "__all__"

    def get_role(self, obj):
        """
        Return the role of the user.

        Parameters:
            - obj (base.User): The user instance.

        Returns:
            - str: The role of the user.
        """
        return obj.role

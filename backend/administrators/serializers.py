from rest_framework import serializers

from .models import Administrator


class AdministratorPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Administrator
        fields = [
            "username",
            "name",
            "email",
            "phone_number",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

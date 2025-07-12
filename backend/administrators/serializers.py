from django.contrib.auth.models import Group

from rest_framework import serializers

from .models import Administrator
from utilities.password import generate_random_password


class AdministratorPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Administrator
        fields = [
            "id",
            "username",
            "name",
            "email",
            "phone_number",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = [
            "first_name",
            "last_name",
            "identity_card_number",
            "birth_date",
            "gender",
            "nationality",
            "email",
            "phone_number",
        ]

    def create(self, validated_data):
        administrator = Administrator.objects.create(
            username=validated_data.get("identity_card_number"),
            **validated_data
        )

        administrator.groups.add(
            Group.objects.get(name=administrator.get_default_group_name())
        )

        random_password = generate_random_password()
        administrator.set_password(random_password)

        administrator.save()

        return administrator, random_password

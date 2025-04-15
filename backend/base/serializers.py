from rest_framework import serializers

from doctors.serializers import DoctorCompressSerializer
from patients.serializers import PatientCompressSerializer
from .models import User
from utilities.models import get_role_


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    patient = PatientCompressSerializer(required=False)
    doctor = DoctorCompressSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "identity_card_number",
            "first_name",
            "last_name",
            "birth_date",
            "phone_number",
            "email",
            "gender",
            "nationality",
            "role",
            "patient",
            "doctor",
        ]

    def get_role(self, obj):
        return get_role_(obj)

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        keys_to_delete = [key for key, value in representation.items() if value is None]

        for key in keys_to_delete:
            del representation[key]

        return representation

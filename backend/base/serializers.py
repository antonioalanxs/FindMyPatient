from rest_framework import serializers

from doctors.serializers import DoctorSerializer
from patients.serializers import PatientSerializer
from .models import User


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    patient = PatientSerializer(required=False)
    doctor = DoctorSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "id",
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
        return obj.groups.values_list("name", flat=True).first()

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        keys_to_delete = [key for key, value in representation.items() if value is None]

        for key in keys_to_delete:
            del representation[key]

        return representation

from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtyCompressSerializer
from .models import Doctor


class DoctorCompressSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    medical_specialties = MedicalSpecialtyCompressSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "medical_specialties",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class DoctorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        exclude = ["id"]


class DoctorPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "phone_number",
            "email",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

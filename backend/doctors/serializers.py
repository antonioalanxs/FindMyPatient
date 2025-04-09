from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtyPreviewSerializer
from .models import Doctor


class DoctorCompressSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    medical_specialties = MedicalSpecialtyPreviewSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "medical_specialties",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"



class DoctorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"


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

from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtyPreviewSerializer
from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):
    medical_specialties = MedicalSpecialtyPreviewSerializer(many=True, read_only=True)
    patients_count = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "first_name",
            "last_name",
            "collegiate_code",
            "patients_count",
            "medical_specialties",
        ]

    def get_patients_count(self, obj):
        return obj.patients.count()


class DoctorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"

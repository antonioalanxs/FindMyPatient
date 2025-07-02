from rest_framework import serializers

from doctors.serializers import DoctorWhoPrescribedSomethingSerializer
from .models import MedicalTest


class MedicalTestPreviewSerializer(serializers.ModelSerializer):
    doctor = DoctorWhoPrescribedSomethingSerializer(read_only=True)
    medical_specialty = serializers.CharField(source='doctor.medical_specialty.name', read_only=True)

    class Meta:
        model = MedicalTest
        fields = [
            "id",
            "name",
            "description",
            "date",
            "result",
            "doctor",
            "medical_specialty",
        ]


class MedicalTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalTest
        fields = "__all__"

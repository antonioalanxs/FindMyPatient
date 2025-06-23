from rest_framework import serializers

from doctors.serializers import DoctorWhoPrescribedTreatmentSerializer
from .models import Treatment


class TreatmentPreviewSerializer(serializers.ModelSerializer):
    doctor = DoctorWhoPrescribedTreatmentSerializer(read_only=True)

    class Meta:
        model = Treatment
        fields = [
            "id",
            "description",
            "start_date",
            "comments",
            "application_frequency",
            "dosage",
            "doctor"
        ]


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = "__all__"

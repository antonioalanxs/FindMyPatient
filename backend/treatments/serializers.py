from rest_framework import serializers

from doctors.serializers import DoctorWhoPrescribedSomethingSerializer
from .models import Treatment


class TreatmentPreviewSerializer(serializers.ModelSerializer):
    doctor = DoctorWhoPrescribedSomethingSerializer(read_only=True)

    class Meta:
        model = Treatment
        fields = [
            "id",
            "description",
            "start_date",
            "duration",
            "comments",
            "application_frequency",
            "dosage",
            "doctor"
        ]


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = "__all__"

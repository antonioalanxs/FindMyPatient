from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer
from .models import Room


class RoomPreviewSerializer(serializers.ModelSerializer):
    medical_specialty = MedicalSpecialtySqueezeSerializer(read_only=True)

    class Meta:
        model = Room
        fields = [
            'id',
            'name',
            'description',
            'location',
            'medical_specialty'
        ]

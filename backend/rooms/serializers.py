from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer
from .models import Room
from medical_specialties.models import MedicalSpecialty


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


class RoomSerializer(serializers.ModelSerializer):
    medical_specialty = MedicalSpecialtySqueezeSerializer()
    availability = serializers.BooleanField(source='is_available')

    class Meta:
        model = Room
        fields = [
            'name',
            'description',
            'location',
            'capacity',
            'medical_specialty',
            'availability',
        ]

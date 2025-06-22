from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer
from .models import Room


class RoomSqueezeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id']

    def to_representation(self, instance):
        return instance.name

    def to_internal_value(self, data):
        if isinstance(data, int):
            return Room.objects.get(id=data)
        return super().to_internal_value(data)


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

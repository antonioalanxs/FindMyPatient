from rest_framework import serializers

from .models import Room


class RoomPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
            'id',
            'name',
            'description',
            'location',
            'medical_specialty'
        ]

from rest_framework import serializers

from .models import MedicalSpecialty


class MedicalSpecialtyPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty

    def to_representation(self, instance):
        return instance.name

class MedicalSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        fields = '__all__'
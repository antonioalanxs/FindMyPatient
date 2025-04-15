from rest_framework import serializers

from .models import MedicalSpecialty


class MedicalSpecialtyCompressSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty

    def to_representation(self, instance):
        return instance.name


class MedicalSpecialtyPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        fields = '__all__'

class MedicalSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        exclude = ['id']

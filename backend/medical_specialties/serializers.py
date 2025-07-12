from rest_framework import serializers

from .models import MedicalSpecialty


class MedicalSpecialtySqueezeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        fields = ['id']

    def to_representation(self, instance):
        return instance.name

    def to_internal_value(self, data):
        if isinstance(data, int):
            return MedicalSpecialty.objects.get(id=data)
        return super().to_internal_value(data)


class MedicalSpecialtyCompressSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        fields = ['id', 'name']


class MedicalSpecialtyPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        fields = '__all__'


class MedicalSpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalSpecialty
        exclude = ['id']

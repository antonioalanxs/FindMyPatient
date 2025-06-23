from django.contrib.auth.models import Group

from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer, MedicalSpecialtyCompressSerializer
from .models import Doctor
from utilities.password import generate_random_password


class DoctorSqueezeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id']

    def to_representation(self, instance):
        return f"{instance.first_name} {instance.last_name}"

    def to_internal_value(self, data):
        if isinstance(data, int):
            return Doctor.objects.get(id=data)
        return super().to_internal_value(data)


class DoctorWhoPrescribedTreatmentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "name",
            "collegiate_code",
            "email",
            "phone_number",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class DoctorCompressSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    medical_specialty = MedicalSpecialtySqueezeSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "medical_specialty",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class DoctorSerializer(serializers.ModelSerializer):
    medical_specialty = MedicalSpecialtyCompressSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "first_name",
            "last_name",
            "identity_card_number",
            "birth_date",
            "gender",
            "nationality",
            "email",
            "phone_number",
            "collegiate_code",
            "medical_specialty",
        ]


class DoctorUpsetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            "first_name",
            "last_name",
            "identity_card_number",
            "birth_date",
            "gender",
            "nationality",
            "email",
            "phone_number",
            "collegiate_code",
            "medical_specialty",
        ]

    def create(self, validated_data):
        doctor = Doctor.objects.create(
            username=validated_data.get("identity_card_number"),
            **validated_data
        )

        doctor.groups.add(
            Group.objects.get(name=doctor.get_default_group_name())
        )

        random_password = generate_random_password()
        doctor.set_password(random_password)

        doctor.save()

        return doctor, random_password


class DoctorPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    medical_specialty = MedicalSpecialtySqueezeSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "phone_number",
            "email",
            "medical_specialty",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

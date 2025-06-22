from django.contrib.auth.models import Group

from rest_framework import serializers

from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer
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


class DoctorCompressSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    medical_specialties = MedicalSpecialtySqueezeSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "medical_specialties",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class DoctorSerializer(serializers.ModelSerializer):
    medical_specialties = MedicalSpecialtySqueezeSerializer(many=True, read_only=True)

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
            "medical_specialties",
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
            "medical_specialties",
        ]

    def create(self, validated_data):
        medical_specialties = validated_data.pop("medical_specialties", [])

        doctor = Doctor.objects.create(
            username=validated_data.get("identity_card_number"),
            **validated_data
        )

        doctor.groups.add(
            Group.objects.get(name=doctor.get_default_group_name())
        )

        doctor.medical_specialties.set(medical_specialties)

        random_password = generate_random_password()
        doctor.set_password(random_password)

        doctor.save()

        return doctor, random_password


class DoctorPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "collegiate_code",
            "phone_number",
            "email",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

from django.contrib.auth.models import Group
from rest_framework import serializers

from doctors.serializers import DoctorCompressSerializer
from addresses.serializers import AddressSerializer
from addresses.models import Address
from doctors.models import Doctor
from .models import Patient
from utilities.password import generate_random_password


class PatientObliteratedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id']

    def to_representation(self, instance):
        return f"{instance.first_name} {instance.last_name}"

    def to_internal_value(self, data):
        if isinstance(data, int):
            return Patient.objects.get(id=data)
        return super().to_internal_value(data)

class PatientPreviewSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "birth_date",
            "phone_number",
            "email",
            "identity_card_number",
            "social_security_code",
        ]

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class PatientCompressSerializer(serializers.ModelSerializer):
    primary_doctor = DoctorCompressSerializer(read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = [
            "social_security_code",
            "address",
            "primary_doctor",
        ]


class PatientSerializer(serializers.ModelSerializer):
    primary_doctor_id = serializers.IntegerField()
    address = AddressSerializer()

    class Meta:
        model = Patient
        fields = [
            "first_name",
            "last_name",
            "identity_card_number",
            "birth_date",
            "gender",
            "nationality",
            "social_security_code",
            "email",
            "phone_number",
            "primary_doctor_id",
            "address",
        ]

    def create(self, validated_data):
        patient = Patient.objects.create(
            username=validated_data.get("identity_card_number"),
            primary_doctor=Doctor.objects.get(id=validated_data.pop("primary_doctor_id")),
            address=Address.objects.create(**validated_data.pop("address")),
            **validated_data
        )

        patient.groups.add(
            Group.objects.get(name=patient.get_default_group_name())
        )

        random_password = generate_random_password()
        patient.set_password(random_password)

        patient.save()

        return patient, random_password

    def update(self, instance, validated_data):
        address_data = validated_data.pop("address", None)
        if address_data:
            for attribute, value in address_data.items():
                setattr(instance.address, attribute, value)
                instance.address.save()

        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)
        instance.save()

        return instance


class PatientSqueezeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "identity_card_number",
            "social_security_code",
        ]

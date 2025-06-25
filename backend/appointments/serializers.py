from config.settings import EMAIL_DATE_FORMAT

from rest_framework import serializers

from doctors.serializers import DoctorSqueezeSerializer
from medical_specialties.serializers import MedicalSpecialtySqueezeSerializer
from patients.serializers import (
    PatientObliteratedSerializer,
    PatientAppointmentSerializer
)
from rooms.serializers import RoomSqueezeSerializer
from .models import Appointment


class AppointmentUpsetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentPreviewSerializer(serializers.ModelSerializer):
    request_date = serializers.DateTimeField(format=EMAIL_DATE_FORMAT)
    start_date = serializers.DateTimeField(
        source='schedule.start_time',
        format=EMAIL_DATE_FORMAT,
    )
    room = RoomSqueezeSerializer(read_only=True)
    medical_specialty = MedicalSpecialtySqueezeSerializer(read_only=True)
    patient = PatientObliteratedSerializer(read_only=True)
    doctor = DoctorSqueezeSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "request_date",
            "start_date",
            "status",
            "room",
            "medical_specialty",
            "doctor",
            "patient",
        ]


class AppointmentDetailSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(
        source='schedule.start_time',
        format=EMAIL_DATE_FORMAT,
    )
    request_date = serializers.DateTimeField(format=EMAIL_DATE_FORMAT)
    patient = PatientAppointmentSerializer(read_only=True)
    medical_specialty = MedicalSpecialtySqueezeSerializer(read_only=True)
    room = RoomSqueezeSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "request_date",
            "start_date",
            "status",
            "room",
            "medical_specialty",
            "reason",
            "observations",
            "patient",
        ]


class AppointmentCalendarSerializer(serializers.ModelSerializer):
    start = serializers.DateTimeField(source='schedule.start_time')
    end = serializers.DateTimeField(source='schedule.end_time')
    title = PatientObliteratedSerializer(read_only=True, source='patient')

    class Meta:
        model = Appointment
        fields = ['start', 'end', 'title']

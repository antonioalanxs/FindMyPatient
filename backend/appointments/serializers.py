from config.settings import EMAIL_DATE_FORMAT

from rest_framework import serializers

from .models import Appointment


class CreateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentPreviewSerializer(serializers.ModelSerializer):
    request_date = serializers.DateTimeField(format=EMAIL_DATE_FORMAT)
    patient = serializers.SerializerMethodField()
    doctor = serializers.SerializerMethodField()
    start_date = serializers.DateTimeField(
        source='schedule.start_time',
        format=EMAIL_DATE_FORMAT,
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "request_date",
            "status",
            "reason",
            "medical_specialty",
            "patient",
            "doctor",
            "room",
            "start_date"
        ]

    def get_patient(self, obj):
        return {
            "name": f"{obj.patient.first_name} {obj.patient.last_name}",
            "social_security_code": obj.patient.social_security_code,
            "phone_number": obj.patient.phone_number,
        }

    def get_doctor(self, obj):
        return {
            "name": f"{obj.doctor.first_name} {obj.doctor.last_name}",
            "collegiate_code": obj.doctor.collegiate_code,
            "email": obj.doctor.email,
        }

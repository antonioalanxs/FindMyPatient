from django.db import models

from medical_specialties.models import MedicalSpecialty
from patients.models import Patient
from doctors.models import Doctor
from rooms.models import Room
from schedules.models import Schedule


# Create your models here.

class Appointment(models.Model):
    class Meta:
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"
        ordering = ["request_date"]

    request_date = models.DateTimeField(
        auto_now_add=True,
    )

    status = models.CharField(
        max_length=25,
        choices=[
            ("unknown", "Unknown"),
            ("scheduled", "Scheduled"),
            ("in_progress", "In Progress"),
            ("completed", "Completed"),
            ("absent", "Absent"),
            ("cancelled", "Cancelled"),
        ],
        default="unknown",
    )

    reason = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    observations = models.TextField(
        max_length=255,
        blank=True,
        null=True,
    )

    medical_specialty = models.ForeignKey(
        MedicalSpecialty,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    schedule = models.ForeignKey(
        Schedule,
        on_delete=models.SET_NULL,
        related_name="appointments",
        blank=True,
        null=True,
    )

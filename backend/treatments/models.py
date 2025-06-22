from django.db import models

from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment


# Create your models here.

class Treatment(models.Model):
    class Meta:
        verbose_name = "Treatment"
        verbose_name_plural = "Treatments"

    description = models.CharField(max_length=255)
    duration = models.CharField(max_length=25)
    start_date = models.DateField()
    comments = models.TextField(max_length=255, blank=True, null=True)
    application_frequency = models.CharField(max_length=25, blank=True, null=True)
    dosage = models.CharField(max_length=25, blank=True, null=True)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='treatments',
        null=True
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='treatments',
        null=True
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.CASCADE,
        related_name='treatments',
        null=True
    )

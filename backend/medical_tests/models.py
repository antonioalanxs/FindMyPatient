from django.db import models

from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment


# Create your models here.

class MedicalTest(models.Model):
    class Meta:
        verbose_name = "Medical Test"
        verbose_name_plural = "Medical Tests"

    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    result = models.TextField(blank=True, null=True)

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='medical_tests',
        null=True,
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='medical_tests',
        null=True,
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.CASCADE,
        related_name='medical_tests',
        null=True,
    )

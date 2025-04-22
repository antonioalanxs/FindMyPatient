from django.db import models

from base.models import User
from doctors.models import Doctor
from clinical_history.models import ClinicalHistory
from addresses.models import Address


# Create your models here.

class Patient(User):
    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    social_security_code = models.CharField(
        max_length=12,
        unique=True,
        blank=False,
        null=False,
        error_messages={
            "unique": "A user with that social security code already exists."
        }
    )

    primary_doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        related_name="patients",
        null=True,
        blank=True,
    )

    clinical_history = models.ManyToManyField(ClinicalHistory)

    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        related_name="patients",
        null=True,
    )

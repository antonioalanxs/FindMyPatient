from django.db import models

from base.models import User
from medical_specialties.models import MedicalSpecialty

# Create your models here.

class Doctor(User):
    class Meta:
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    collegiate_code = models.CharField(max_length=10, unique=True, null=False, blank=False)
    medical_specialties = models.ManyToManyField(MedicalSpecialty)

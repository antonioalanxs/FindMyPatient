from django.db import models
from django.contrib.auth.models import AbstractUser

from base.models import User, MedicalSpecialty, ClinicalHistory


# Create your models here.

class Administrator(User):
    """
    This model is used to store the administrators of the platform.
    """

    class Meta:
        verbose_name = "Administrator"
        verbose_name_plural = "Administrators"


class Doctor(User):
    """
    This model is used to store the doctors of the platform.

    Attributes:
        collegiate_code (str): The collegiate code of the doctor.
        medical_specialties (list of MedicalSpecialty): The medical specialties of the doctor.
    """

    class Meta:
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    collegiate_code = models.CharField(max_length=10, unique=True)
    medical_specialties = models.ManyToManyField(MedicalSpecialty)


class Patient(User):
    """
    This model is used to store the patients of the platform.

    Attributes:
        social_security_code (str): The social security code of the patient.
        assigned_doctor (Doctor): The doctor assigned to the patient.
        clinical_history (list of ClinicalHistory): The clinical history of the patient.
        street (str): The street of the patient's address.
        city (str): The city of the address of the patient.
        state (str): The state of the address of the patient.
        country (str): The country of the address of the patient.
        zip_code (str): The zip code of the address of the patient.
    """

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    social_security_code = models.CharField(
        max_length=12,
        unique=True,
        blank=False,
        null=False,
    )

    assigned_doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        related_name="patients",
        null=True,
        blank=True
    )

    clinical_history = models.ManyToManyField(ClinicalHistory)

    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)

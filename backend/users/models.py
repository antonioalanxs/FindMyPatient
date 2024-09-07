from django.db import models
from django.contrib.auth.models import AbstractUser

from base.models import User, MedicalSpecialty, Address


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
    medical_specialties = models.ManyToManyField(MedicalSpecialty, blank=True)


class Patient(User):
    """
    This model is used to store the patients of the platform.

    Attributes:
        identity_card_number (str): The identity card number of the patient.
        gender (str): The gender of the patient.
        birth_date (date): The birthdate of the patient.
        phone_number (str): The phone number of the patient.
        nationality (str): The nationality of the patient.
        address (Address): The address of the patient.
        social_security_code (str): The social security code of the patient.
        assigned_doctor (Doctor): The doctor assigned to the patient.
    """

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    identity_card_number = models.CharField(
        max_length=20,
        unique=True,
        blank=False,
        null=False
    )

    gender = models.CharField(
        max_length=1,
        choices=(
            ("M", "Male"),
            ("F", "Female"),
        ),
    )

    birth_date = models.DateField(
        null=False,
        blank=False
    )

    phone_number = models.CharField(
        max_length=20,
        blank=False,
        null=False
    )

    nationality = models.CharField(
        max_length=255,
        blank=False,
        null=False
    )

    address = models.OneToOneField(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

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

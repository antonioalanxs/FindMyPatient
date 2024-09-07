from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class BaseUser(AbstractUser):
    """
    This model is used to store the common fields between the different types of users.

    Migrations are enabled for this model as it defines `AUTH_USER_MODEL` and must include the `username` field required
    by the settings.

    Attributes:
        reset_password_token (str): The token used to reset the password of the user.

    Disabled default fields:
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        is_staff (bool): Whether the user can access the admin site.
        is_superuser (bool): Whether the user is a superuser.
        date_joined (datetime): The date the user joined the platform.
    """

    class Meta:
        db_table = "users_user"

    reset_password_token = models.CharField(
        unique=True,
        max_length=255,
        null=True,
        blank=True
    )

    first_name = None
    last_name = None
    is_staff = None
    is_superuser = None
    date_joined = None


class User(BaseUser):
    """
    This model works as its parent class, but with additional fields.

    Migrations are disabled for this model.

    Attributes:
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        birth_date (date): The birthdate of the user.
        description (str): The description of the user.
        invitation_token (str): The token used to invite the user to the platform.
    """

    class Meta:
        abstract = True

    first_name = models.CharField(
        max_length=255,
        null=False,
        blank=False
    )

    last_name = models.CharField(
        max_length=255,
        null=False,
        blank=False
    )

    birth_date = models.DateField(
        null=False,
        blank=False
    )

    description = models.TextField(
        null=True,
        blank=True
    )

    invitation_token = models.CharField(
        unique=True,
        max_length=255,
        null=True,
        blank=True
    )


class Administrator(BaseUser):
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
        specialty (str): The specialty of the doctor.
        date_joined (datetime): The date the doctor joined the platform.
    """

    class Meta:
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    specialty = models.CharField(
        max_length=255,
        null=False,
        blank=False
    )

    date_joined = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=False
    )


class Patient(User):
    """
    This model is used to store the patients of the platform.

    Attributes:
        disease (str): The disease of the patient.
        assigned_doctor (Doctor): The doctor assigned to the patient.
    """

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    disease = models.CharField(
        max_length=255,
        null=False,
        blank=False
    )

    assigned_doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="patients",
        null=False,
        blank=False
    )

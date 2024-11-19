from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    This model is used to store the common fields between the different types of users.

    Migrations are enabled for this model as it defines `AUTH_USER_MODEL` and must include the `username` field required
    by the settings.

    Attributes:
        reset_password_token (str): The token used to reset the password of the user.
        identity_card_number (str): The identity card number of the patient.
        gender (str): The gender of the patient.
        birth_date (date): The birthdate of the patient.
        phone_number (str): The phone number of the patient.
        nationality (str): The nationality of the patient.
    """
    reset_password_token = models.CharField(
        unique=True,
        max_length=255,
        null=True,
        blank=True
    )

    birth_date = models.DateField(
        null=False,
        blank=False
    )

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

    is_staff = None
    is_superuser = None

    @property
    def role(self):
        """
        Returns the role of the user dynamically.

        Returns:
            str: The role of the user.
        """
        import users.models as roles

        roles = dir(roles)
        self_name = self.__class__.__name__.lower()

        for role in roles:
            role = role.lower()

            if role == self_name or "__" in role:
                continue

            if hasattr(self, role):
                return role.capitalize()

        return self_name.capitalize()


class MedicalSpecialty(models.Model):
    """
    This model is used to store the medical specialties of the platform.

    Attributes:
        name (str): The name of the medical specialty.
        description (str): The description of the medical specialty.
    """

    class Meta:
        verbose_name = "Medical Specialty"
        verbose_name_plural = "Medical Specialties"

    name = models.CharField(
        max_length=50,
        null=False,
        blank=False
    )

    description = models.TextField(
        null=True,
        blank=True
    )

class ClinicalHistory(models.Model):
    """
    This model is used to store the clinical history of the patients.

    Attributes:
        title (str): The title of the medical history or treatment.
        description (str): A description or notes about the medical history or treatment.
        created_at (date): The date when the history was created.
    """
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    This model is used to store the common fields between the different types of users.

    Migrations are enabled for this model as it defines `AUTH_USER_MODEL` and must include the `username` field required
    by the settings.

    Attributes:
        reset_password_token (str): The token used to reset the password of the user.
    """
    reset_password_token = models.CharField(
        unique=True,
        max_length=255,
        null=True,
        blank=True
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


class Address(models.Model):
    """
    This model is used to store the address of a user.

    Attributes:
        street (str): The street of the address.
        city (str): The city of the address.
        state (str): The state of the address.
        country (str): The country of the address.
        zip_code (str): The zip code of the address.
    """

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)


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


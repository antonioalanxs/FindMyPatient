from django.dispatch import receiver
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import AbstractUser, Group


class User(AbstractUser):
    class Meta:
        ordering = ['id']

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
        null=False,
        error_messages={
            'unique': "A user with that identity card number already exists."
        }
    )

    gender = models.CharField(
        max_length=1,
        choices=(
            ("M", "Male"),
            ("F", "Female"),
        ),
    )

    phone_number = models.CharField(
        max_length=15,
        unique=True,
        blank=False,
        null=False,
        error_messages={
            'unique': "A user with that phone number already exists.",
        }
    )

    nationality = models.CharField(
        max_length=255,
        blank=False,
        null=False
    )

    is_superuser = None
    is_staff = None

    def get_default_group_name(self):
        return self.__class__.__name__.lower()


@receiver(pre_save, sender=User)
def set_default_is_active(sender, instance, **kwargs):
    instance.is_active = True

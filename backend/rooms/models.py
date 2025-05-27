from django.db import models

from medical_specialties.models import MedicalSpecialty


class Room(models.Model):
    class Meta:
        verbose_name = "Room"
        verbose_name_plural = "Rooms"

    name = models.CharField(
        max_length=50,
        unique=True,
    )

    description = models.TextField(
        max_length=100,
        blank=True,
        null=True,
    )

    location = models.CharField(
        max_length=50,
    )

    capacity = models.IntegerField(
        blank=True,
        null=True,
    )

    medical_specialty = models.ForeignKey(
        MedicalSpecialty,
        on_delete=models.CASCADE,
        related_name="rooms",
        blank=True,
        null=True,
    )

    is_available = models.BooleanField(
        default=True,
    )

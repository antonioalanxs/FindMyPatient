from django.db import models

# Create your models here.

class MedicalSpecialty(models.Model):
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

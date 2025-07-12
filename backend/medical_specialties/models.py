from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


# Create your models here.

class MedicalSpecialty(models.Model):
    class Meta:
        verbose_name = "Medical Specialty"
        verbose_name_plural = "Medical Specialties"

    name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        unique=True,
        error_messages={
            'unique': 'This medical specialty already exists.',
            'blank': 'This field cannot be blank.',
            'null': 'This field cannot be null.'
        },
        validators=[
            MinLengthValidator(5, message='Name must be at least 5 characters long.'),
            MaxLengthValidator(50, message='Name must be at most 50 characters long.')
        ]
    )

    description = models.TextField(
        null=True,
        blank=True,
        validators=[
            MinLengthValidator(25, message='Description must be at least 25 characters long.'),
            MaxLengthValidator(100, message='Description must be at most 100 characters long.')
        ]
    )

    def __str__(self):
        return self.name

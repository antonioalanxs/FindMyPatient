from config.settings import EMAIL_DATE_FORMAT

from django.db import models

from doctors.models import Doctor


# Create your models here.

class Schedule(models.Model):
    class Meta:
        verbose_name = "Schedule"
        verbose_name_plural = "Schedules"

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.start_time.strftime(EMAIL_DATE_FORMAT)} - {self.end_time.strftime(EMAIL_DATE_FORMAT)}"

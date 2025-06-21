from config.settings import (
    BRAND_NAME,
    DEFAULT_VALUE,
    GOOGLE_CALENDAR_DATE_FORMAT
)

from django.db import models
from django.core.validators import MinLengthValidator

from urllib.parse import quote

from medical_specialties.models import MedicalSpecialty
from patients.models import Patient
from doctors.models import Doctor
from rooms.models import Room
from schedules.models import Schedule


# Create your models here.


class Appointment(models.Model):
    STATUS_UNKNOWN = "unknown"
    STATUS_SCHEDULED = "scheduled"
    STATUS_IN_PROGRESS = "in_progress"
    STATUS_COMPLETED = "completed"
    STATUS_ABSENT = "absent"
    STATUS_CANCELLED = "cancelled"

    __STATUS_CHOICES = [
        (STATUS_UNKNOWN, STATUS_UNKNOWN.title()),
        (STATUS_SCHEDULED, STATUS_SCHEDULED.title()),
        (STATUS_IN_PROGRESS, STATUS_IN_PROGRESS.replace("_", " ").title()),
        (STATUS_COMPLETED, STATUS_COMPLETED.title()),
        (STATUS_ABSENT, STATUS_ABSENT.title()),
        (STATUS_CANCELLED, STATUS_CANCELLED.title()),
    ]

    class Meta:
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"
        ordering = ["request_date"]

    request_date = models.DateTimeField(
        auto_now_add=True,
    )

    status = models.CharField(
        max_length=25,
        choices=__STATUS_CHOICES,
        default="unknown",
    )

    reason = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(5)],
        blank=False,
        null=False,
        default=DEFAULT_VALUE,
    )

    observations = models.TextField(
        max_length=255,
        blank=True,
        null=True,
    )

    medical_specialty = models.ForeignKey(
        MedicalSpecialty,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="appointments",
    )

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )

    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )

    schedule = models.ForeignKey(
        Schedule,
        on_delete=models.SET_NULL,
        related_name="appointments",
        blank=True,
        null=True,
    )

    def generate_google_calendar_event(self):
        raw_title = f"Medical appointment with Doctor {self.doctor.first_name} {self.doctor.last_name}"
        title = quote(
            f"{raw_title} | {BRAND_NAME}",
            safe=""
        )
        description = quote(
            f"{raw_title}\n\nMedical specialty - {getattr(getattr(self, 'medical_specialty', None), 'name', DEFAULT_VALUE)}\nReason - {self.reason}\nDate - {self.schedule.start_time}\nLocation - {self.room.name} ({self.room.location})\n\nGenerated automatically by {BRAND_NAME} system.",
            safe=""
        )
        start_date = self.schedule.start_time.strftime(GOOGLE_CALENDAR_DATE_FORMAT)
        end_date = self.schedule.end_time.strftime(GOOGLE_CALENDAR_DATE_FORMAT)

        event = f"https://calendar.google.com/calendar/render?action=TEMPLATE&text={title}&details={description}&dates={start_date}/{end_date}&ctz=Europe/Madrid"

        return event

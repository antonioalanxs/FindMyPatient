from django.db import models

# Create your models here.

class ClinicalHistory(models.Model):
    class Meta:
        verbose_name = "Clinical History"
        verbose_name_plural = "Clinical History"

    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

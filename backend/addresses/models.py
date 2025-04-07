from django.db import models

class Address(models.Model):
    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

    street = models.CharField(max_length=255, null=False, blank=False)
    number = models.CharField(max_length=5, null=False, blank=False)
    city = models.CharField(max_length=255, null=False, blank=False)
    country = models.CharField(max_length=255, null=False, blank=False)
    zip_code = models.CharField(max_length=10, null=False, blank=False)
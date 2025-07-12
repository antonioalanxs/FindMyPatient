from base.models import User

# Create your models here.

class Administrator(User):
    class Meta:
        verbose_name = "Administrator"
        verbose_name_plural = "Administrators"

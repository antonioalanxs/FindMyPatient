from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail

from config.settings import (
    BRAND_NAME,
    EMAIL_HOST_USER
)


class EmailMixin:
    def send_email(self, template_path, email, subject, context):
        context["brand_name"] = BRAND_NAME

        html_message = render_to_string(template_path, context)
        plain_message = strip_tags(html_message)

        send_mail(
            subject=f"{subject} | {BRAND_NAME}",
            message=plain_message,
            html_message=html_message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False
        )

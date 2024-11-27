from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from constants import BRAND_NAME
from utilities.functions import save

User = get_user_model()


class URIEmailMixin:
    """
        Mixin for generating exclusive URIs for the user for operations like activating its account, resetting its
        password, etc.

        It also sends an email to the user with the URI for the operation.
    """

    def __get_uri(self, user, token_name, path):
        """
            Generates an one-time URI.

            Parameters:
                - user (base.User): The user to generate the URI.
                - token_name (str): The user database field to save the token.
                - path (str): The path to generate the URI.

            Returns:
                str: The URI for the user to activate its account.
        """
        token = default_token_generator.make_token(user)
        save(user, token_name, token)
        return f"{path}/{token}"

    def send_email(self, user, token_name, path, subject, template):
        """
            Sends an email to an user with an one-time URI.

            Parameters:
                - user (base.User): The user to generate the URI and send the email.
                - token_name (str): The user database field to save the token.
                - path (str): The path to generate the URI.
                - subject (str): The subject of the email.
                - template (str): The template of the email.
        """
        html_message = render_to_string(
            template,
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "href": self.__get_uri(user, token_name, path),
                "brand_name": BRAND_NAME
            }
        )

        send_mail(
            subject=f"{subject} | {BRAND_NAME}",
            message=strip_tags(html_message),
            html_message=html_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False
        )


class URICertifierMixin:
    """
        Mixin for validating and caducating the URI.
    """

    def is_legal(self, token_name, token, caducate=True):
        """
            Determines if the URI is valid and caducate it.

            Parameters:
                - token_name (str): The token name to validate the URI.
                - token (str): The token to validate the URI.
                - caducate (bool): Whether to caducate the URI or not.

            Returns:
                base.User: The user as a boolean expression.
        """
        user = User.objects.filter(**{token_name: token}).first()

        if default_token_generator.check_token(user, token) and caducate:
            save(user, token_name, None)

        return user

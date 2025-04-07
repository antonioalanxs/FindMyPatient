from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator

from mixins.emails import EmailMixin
from utilities.models import save

User = get_user_model()


class URIMixin(EmailMixin):
    def __get_uri(self, user, token_name, link):
        token = default_token_generator.make_token(user)

        save(user, token_name, token)

        return f"{link}/{token}"

    def send(self, subject, context, template_path='emails/password_reset_request_email_template.html'):
        user, token_name, link = context["user"], context["token_name"], context["link"]

        self.send_email(
            template_path,
            user.email,
            subject,
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "href": self.__get_uri(user, token_name, link),
            }
        )

    def is_legal(self, token, token_name="reset_password_token", caducate=True):
        user = User.objects.filter(**{token_name: token}).first()

        if default_token_generator.check_token(user, token) and caducate:
            save(user, token_name, None)

        return user

from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone

from rest_framework import status
from rest_framework.reverse import reverse

from rest_framework_simplejwt.tokens import AccessToken

from .tests_helper import TestSetUp
from utilities.functions import save


User = get_user_model()


class LoginTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("login")

        self.credentials = {
            "username": "root",
            "password": "root"
        }

    def test_login_with_valid_credentials(self):
        response = self.client.post(self.url, self.credentials, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_with_non_valid_credentials(self):
        self.credentials["username"] = "test"
        response = self.client.post(self.url, self.credentials, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PasswordResetRequestTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("reset_password_request")

        self.existing_email = "test@test.com"

        save(self.user,"email", self.existing_email)

    def test_password_reset_request_existing_email(self):
        response = self.client.post(self.url, {"email": self.existing_email}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_password_reset_request_non_existing_email(self):
        response = self.client.post(self.url, {"email": "test2@test.com"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_password_reset_request_blank_email(self):
        response = self.client.post(self.url, {"email": ""}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PasswordResetTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.new_password = "test2"
        self.token = default_token_generator.make_token(self.user)
        save(self.user, "reset_password_token", self.token)

    def test_password_reset_valid_url(self):
        self.assertTrue(
            User.objects.get(pk=self.user.pk).reset_password_token
        )

        url = reverse("reset_password", kwargs={"token": self.token})
        response = self.client.put(url, {"password": self.new_password})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            User.objects.get(pk=self.user.pk).check_password(self.new_password)
        )
        self.assertIsNone(
            User.objects.get(pk=self.user.pk).reset_password_token
        )

    def test_password_reset_non_valid_url(self):
        url = reverse("reset_password", kwargs={"token": "token"})
        response = self.client.put(url, {"password": self.new_password})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(
            User.objects.get(pk=self.user.pk).check_password(self.new_password)
        )

    def test_password_reset_with_used_url(self):
        self.test_password_reset_valid_url()

        url = reverse("reset_password", kwargs={"token": self.token})
        self.new_password = "test3"
        response = self.client.put(url, {"password": self.new_password})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_is_reset_password_token_valid_with_valid_token(self):
        url = reverse("reset_password", kwargs={"token": self.token})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["is_reset_password_token_valid"])

    def test_is_reset_password_token_valid_with_non_valid_token(self):
        url = reverse("reset_password", kwargs={"token": "test"})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["is_reset_password_token_valid"])

    def test_is_reset_password_token_valid_with_used_token(self):
        self.test_password_reset_valid_url()

        url = reverse("reset_password", kwargs={"token": self.token})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["is_reset_password_token_valid"])


class LogoutTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("logout")

        self.access_token = AccessToken.for_user(self.user)

    def test_logout_authenticated_user(self):
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_non_authenticated_user(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_with_expired_access_token(self):
        self.test_logout_authenticated_user()
        self.access_token.set_exp(
            from_time=timezone.now() - timedelta(
                seconds=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()
            )
        )
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ChangePasswordTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("change_password")

        self.old_password = "root"
        self.new_password = "test"

    def test_change_password_with_correct_old_password(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.put(
            self.url,
            {
                "old_password": self.old_password,
                "new_password": self.new_password
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            User.objects.get(pk=self.user.pk).check_password(self.new_password)
        )

    def test_change_password_with_non_correct_old_password(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.put(
            self.url,
            {
                "old_password": "_test",
                "new_password": self.new_password
            }
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_non_authenticated_user(self):
        response = self.client.put(
            self.url,
            {
                "old_password": self.old_password,
                "new_password": self.new_password
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

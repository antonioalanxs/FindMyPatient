from django.contrib.auth.tokens import default_token_generator

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from users.models import Administrator
from utilities.functions import save


class LoginTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("login")

        self.credentials = {
            "username": "root",
            "password": "root"
        }

        self.user = Administrator.objects.create(username=self.credentials["username"])
        self.user.set_password(self.credentials["password"])
        self.user.save()

    def test_login_with_valid_credentials(self):
        response = self.client.post(self.url, self.credentials, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_with_non_valid_credentials(self):
        self.credentials["username"] = "test"
        response = self.client.post(self.url, self.credentials, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PasswordResetRequestTestCase(APITestCase):
    def setUp(self):
        self.url = reverse("reset_password_request")

        self.existing_email = "test@test.com"

        self.user = Administrator.objects.create(email=self.existing_email, username="test", password="test")

    def test_password_reset_request_existing_email(self):
        response = self.client.post(self.url, {"email": self.existing_email}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_password_reset_request_non_existing_email(self):
        response = self.client.post(self.url, {"email": "test2@test.com"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_reset_request_blank_email(self):
        response = self.client.post(self.url, {"email": ""}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PasswordResetTestCase(APITestCase):
    def setUp(self):
        self.user = Administrator.objects.create(
            email="test@test.com",
            username="test",
            password="test",
        )

        self.new_password = "test2"

        self.token = default_token_generator.make_token(self.user)

        save(self.user, "reset_password_token", self.token)

    def test_password_reset_valid_url(self):
        self.assertTrue(
            Administrator.objects.get(pk=self.user.pk).reset_password_token
        )

        url = reverse("reset_password", kwargs={"token": self.token})
        response = self.client.put(url, {"password": self.new_password})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            Administrator.objects.get(pk=self.user.pk).check_password(self.new_password)
        )
        self.assertIsNone(
            Administrator.objects.get(pk=self.user.pk).reset_password_token
        )

    def test_password_reset_non_valid_url(self):
        url = reverse("reset_password", kwargs={"token": "token"})
        response = self.client.put(url, {"password": self.new_password})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(
            Administrator.objects.get(pk=self.user.pk).check_password(self.new_password)
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

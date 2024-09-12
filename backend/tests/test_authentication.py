from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from users.models import Administrator


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

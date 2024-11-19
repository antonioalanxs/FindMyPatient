from datetime import timedelta

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from rest_framework_simplejwt.tokens import AccessToken

from users.models import Administrator, Patient
from utilities.functions import save


class UsersTestCase(APITestCase):
    def setUp(self):
        self.user = Patient.objects.create(
            username="test",
            password="test",
            birth_date="2024-07-04"
        )
        self.user.save()

        self.change_address_url = reverse("address")

    def test_change_address(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(self.change_address_url, {"street": "test"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.street, "test")

    def test_change_address_with_non_authenticated_user(self):
        response = self.client.patch(self.change_address_url, {"street": "test"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

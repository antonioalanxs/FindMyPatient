from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp

class UsersTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

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

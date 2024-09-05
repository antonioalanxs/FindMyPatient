from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class AuthenticationAPITestCase(TestSetUp):
    def test_hello_world(self):
        endpoint = reverse('hello-world')

        response = self.client.get(endpoint)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

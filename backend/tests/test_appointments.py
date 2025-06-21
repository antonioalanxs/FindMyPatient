from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class AppointmentListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("appointments-list")

    def test_list_appointments_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_appointments_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

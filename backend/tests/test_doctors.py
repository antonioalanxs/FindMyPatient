from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class DoctorUpdateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("doctors-detail", kwargs={"id": id})

    def test_update_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_non_existing_doctor(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.non_existing_id), data={})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_doctor_who_is_not_self(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.another_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_doctor_with_malformed_input(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.doctor.id), data={"collegiate_code": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_doctor_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_doctor_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class DoctorListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("doctors-list")

    def test_list_doctors(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_doctors_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_doctors_with_patient(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_doctors_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_doctors_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

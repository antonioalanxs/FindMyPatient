from config.settings import PATIENT_QUERY_PARAMETER

from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class MedicalTestListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse('medical_tests-list')
        self.url_query_param = PATIENT_QUERY_PARAMETER

    def test_list_medical_tests_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_medical_tests_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_medical_tests_for_patient_assigned_to_doctor_with_patient(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        url = f"{self.url}?{self.url_query_param}={self.patient_with_address_and_primary_doctor.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_medical_tests_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_medical_tests_for_patient_assigned_to_doctor_as_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        url = f"{self.url}?{self.url_query_param}={self.patient_with_address_and_primary_doctor.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_medical_tests_for_patient_not_assigned_to_doctor_as_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        url = f"{self.url}?{self.url_query_param}={self.patient_without_address_and_primary_doctor.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_medical_tests_for_non_existing_patient_as_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        url = f"{self.url}?{self.url_query_param}={self.non_existing_id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_medical_tests_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class MedicalSpecialtyListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("medical_specialties-list")

    def test_list_medical_specialties(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_medical_specialties_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_medical_specialties_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_medical_specialties_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class MedicalSpecialtyRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("medical_specialties-detail", kwargs={"pk": id})

    def test_retrieve_medical_specialty(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_non_existing_medical_specialty(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_medical_specialty_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_medical_specialty_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_medical_specialty_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ListDoctorsByMedicalSpecialtyTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse(
            "medical_specialties-doctors",
            kwargs={"pk": id}
        )

    def test_list_doctors_by_medical_specialty(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_doctors_by_medical_specialty_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_doctors_by_medical_specialty_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_doctors_by_medical_specialty_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.medical_specialty.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class MedicalSpecialtyUpdateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("medical_specialties-detail", kwargs={"pk": id})

    def test_update_medical_specialty(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.medical_specialty.id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_non_existing_medical_specialty(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.non_existing_id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_medical_specialty_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(self.url(self.medical_specialty.id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_medical_specialty_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.medical_specialty.id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_medical_specialty_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.medical_specialty.id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_medical_specialty_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        self.medical_specialty_input["name"] = ""
        response = self.client.patch(self.url(self.medical_specialty.id), self.medical_specialty_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


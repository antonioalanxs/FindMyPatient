from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class PatientListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("patients-list")

    def test_list_patients(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_patients_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_patients_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_patients_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PatientUpdateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("patients-detail", kwargs={"id": id})

    def test_update_patient(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_non_existing_patient(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.non_existing_id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_patient_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_patient_with_malformed_input(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={"birth_date": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_patient_with_owner_user(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_patient_with_non_owner_user(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_patient_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_patient_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PatientCreateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("patients-list")

        self.input = {
            "first_name": "Antonio José",
            "last_name": "Alanís Bernal",
            "identity_card_number": "54182062L",
            "social_security_code": "281628165548",
            "email": "antoniojalanis7131@gmail.com",
            "phone_number": "+34684222019",
            "address": {
                "street": "Málaga",
                "number": "8",
                "city": "Aznalcóllar",
                "zip_code": "41870",
                "country": "ES"
            },
            "birth_date": "2002-07-04",
            "gender": "M",
            "nationality": "ES",
            "primary_doctor_id": self.doctor.id
        }

    def test_create_patient_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_patient_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_patient_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_patient_with_non_authenticated_user(self):
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_patient_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data={}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_existing_patient(self):
        self.client.force_authenticate(user=self.administrator)

        self.client.post(self.url, data=self.input, format="json")
        response = self.client.post(self.url, data=self.input, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

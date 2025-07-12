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


class DoctorRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("doctors-detail", kwargs={"id": id})

    def test_retrieve_doctor(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_non_existing_doctor(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_doctor_with_patient_who_is_assigned_to_it(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_doctor_with_patient_who_is_not_assigned_to_it(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_doctor_with_doctor(self):
        self.client.force_authenticate(user=self.another_doctor)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_doctor_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ListPatientsByDoctorTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse(
            "doctors-patients",
            kwargs={"id": id}
        )

    def test_list_patients_by_doctor(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_patients_by_doctor_with_owner_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_patients_by_doctor_with_non_owner_doctor(self):
        self.client.force_authenticate(user=self.another_doctor)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_patients_by_doctor_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_patients_by_doctor_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.doctor.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class DoctorCreateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("doctors-list")

        self.input = {
            "first_name": "Antonio José",
            "last_name": "Alanís Bernal",
            "identity_card_number": "54182062L",
            "email": "antoniojalanis7131@gmail.com",
            "phone_number": "+34684222019",
            "collegiate_code": "28/745193B",
            "birth_date": "2002-07-04",
            "gender": "M",
            "nationality": "ES",
            "medical_specialty": self.medical_specialty.id
        }

    def test_create_doctor(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_doctor_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_doctor_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_doctor_with_non_authenticated_user(self):
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_doctor_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data={"collegiate_code": ""}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_existing_doctor(self):
        self.client.force_authenticate(user=self.administrator)

        self.client.post(self.url, data=self.input, format="json")
        response = self.client.post(self.url, data=self.input, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

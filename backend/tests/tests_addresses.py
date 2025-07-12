from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class AddressTestSetUp(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("patient-address", kwargs={"id": id})


class AddressRetrieveTestCase(AddressTestSetUp):
    def test_retrieve_address_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_address_of_non_existing_patient(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_address_of_a_patient_who_is_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_address_of_a_patient_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_without_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_address_with_owner_user(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_address_with_non_owner_user(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def retrieve_address_with_patient_without_address(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.get(self.url(self.patient_without_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_address_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AddressUpdateTestCase(AddressTestSetUp):
    def test_update_address_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_address_of_non_existing_patient(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.non_existing_id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_address_of_a_patient_who_is_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_address_of_a_patient_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_address_with_owner_user(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_address_with_non_owner_user(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_address_with_malformed_input(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)

        self.address_input.pop("street")
        self.address_input["city"] = ""

        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_address_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.user.id), self.address_input)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

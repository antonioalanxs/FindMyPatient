from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class UserRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("users-detail", kwargs={"id": id})

    def test_retrieve_user(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_non_existing_user(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_user_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_user_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user_who_is_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_without_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_user_who_is_self(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user_who_is_not_self(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class UserUpdateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("users-detail", kwargs={"id": id})

    def test_update_user_with_owner_user(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_with_non_owner_user(self):
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_user_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_with_doctor_who_is_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_with_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_with_doctor_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.patient_without_address_and_primary_doctor.id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_user_with_malformed_input(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(self.url(self.user.id), data={"birth_date": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserDestroyTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("users-detail", kwargs={"id": id})

    def test_destroy_patient_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_user_with_non_authenticated_user(self):
        response = self.client.delete(self.url(self.user.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_self_destroy_yourself_as_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy_patient(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.delete(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_non_existing_user(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_patient_who_is_not_assigned_to_a_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.delete(self.url(self.patient_without_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_patient_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

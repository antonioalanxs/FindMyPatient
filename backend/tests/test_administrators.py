from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class AdministratorListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("administrators-list")

    def test_list_administrators(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_administrators_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_administrators_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_administrators_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AdministratorCreateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("administrators-list")

        self.input = {
            "first_name": "Antonio José",
            "last_name": "Alanís Bernal",
            "identity_card_number": "54182062L",
            "social_security_code": "281628165548",
            "email": "antoniojalanis7131@gmail.com",
            "phone_number": "+34684222019",
            "birth_date": "2002-07-04",
            "gender": "M",
            "nationality": "ES"
        }

    def test_create_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data=self.input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_existing_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        self.client.post(self.url, data=self.input)
        response = self.client.post(self.url, data=self.input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_administrator_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_administrator_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.post(self.url, data=self.input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_administrator_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, data=self.input)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_administrator_with_non_authenticated_user(self):
        response = self.client.post(self.url, data=self.input)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class AdministratorRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("administrators-detail", kwargs={"id": id})

    def test_retrieve_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_administrator_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_administrator_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_administrator_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.administrator.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_non_existing_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

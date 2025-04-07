from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class GroupListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("groups-list")

    def test_list_groups(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_groups_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_groups_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_groups_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GroupRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("groups-detail", kwargs={"pk": id})

        self.group_id = self.group_ids[0]

    def test_retrieve_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_non_existing_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_group_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_group_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_group_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GroupUpdateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("groups-detail", kwargs={"pk": id})

        self.group_id = self.group_ids[0]

    def test_update_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.group_id), data={})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_non_existing_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.non_existing_id), data={})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_group_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(self.url(self.group_id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_group_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.group_id), data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_group_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.group_id), data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_group_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.group_id), data={"name": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CreateGroupTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("groups-list")

    def test_create_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data={"name": "test"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_existing_group(self):
        self.client.force_authenticate(user=self.administrator)

        self.client.post(self.url, data={"name": "test"})
        response = self.client.post(self.url, data={"name": "test"})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_group_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_group_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_group_with_non_authenticated_user(self):
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def create_group_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data={"name": ""})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GroupDestroyTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("groups-detail", kwargs={"pk": id})

        self.group_id = self.group_ids[0]

    def test_destroy_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_non_existing_group(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_group_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_group_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.delete(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_group_with_non_authenticated_user(self):
        response = self.client.delete(self.url(self.group_id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

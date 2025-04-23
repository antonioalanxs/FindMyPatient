from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class RoomListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("rooms-list")

    def test_list_rooms(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_rooms_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_rooms_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_rooms_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class RoomDestroyTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("rooms-detail", kwargs={"pk": id})

    def test_destroy_room(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_destroy_non_existing_room(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.delete(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_room_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_room_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.delete(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_destroy_room_with_non_authenticated_user(self):
        response = self.client.delete(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class RoomRetrieveTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("rooms-detail", kwargs={"pk": id})

    def test_retrieve_room(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_non_existing_room(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_room_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_room_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_room_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.room.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class RoomCreateTestCase(TestSetUp):
    def setUp(self):
        super().setUp()

        self.url = reverse("rooms-list")

        self.input = {
            "name": "Room 0404",
            "description": "Gynecological examination room with privacy curtains.",
            "location": "4th Floor, South Wing",
            "capacity": 2,
            "medical_specialty": self.medical_specialty_id,
            "availability": True
        }

    def test_create_room(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_existing_room(self):
        self.client.force_authenticate(user=self.administrator)

        self.client.post(self.url, data=self.input, format="json")

        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_room_with_patient(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_room_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_room_with_non_authenticated_user(self):
        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_room_with_malformed_input(self):
        self.client.force_authenticate(user=self.administrator)

        self.input["capacity"] = "test"

        response = self.client.post(self.url, data=self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

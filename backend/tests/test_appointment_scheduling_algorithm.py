from rest_framework import status
from rest_framework.reverse import reverse

from appointments.models import Appointment
from schedules.models import Schedule
from .tests_helper import TestSetUp


class AppointmentSchedulingAlgorithmTest(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("appointments-list")

        self.input = {
            "reason": "testtest",
            "time_preference": 1,  # Ensure corner cases
            "medical_specialty": self.medical_specialty.id,
            "patient": self.patient_with_address_and_primary_doctor.id,
        }

    def test_scheduling_algorithm_with_malformed_input(self):
        self.input["reason"] = None
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheduling_algorithm_with_non_authenticated_user(self):
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_scheduling_algorithm_with_non_existing_patient(self):
        self.input["patient"] = self.non_existing_id
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheduling_algorithm_with_non_existing_medical_specialty(self):
        self.input["medical_specialty"] = self.non_existing_id
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheduling_algorithm_with_patient_without_primary_doctor(self):
        self.input["patient"] = self.patient_without_address_and_primary_doctor.id
        self.client.force_authenticate(user=self.patient_without_address_and_primary_doctor)
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheduling_algorithm(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.post(self.url, self.input, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_scheduling_algorithm_assigns_busy_doctor_and_falls_back_to_another(self):
        self.client.force_authenticate(user=self.administrator)

        while not Schedule.objects.filter(doctor=self.another_doctor).exists():
            response = self.client.post(self.url, self.input, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Schedule.objects.filter(doctor=self.another_doctor).exists())

    def test_scheduling_algorithm_with_no_doctors_available(self):
        self.client.force_authenticate(user=self.administrator)

        self.another_doctor.delete()
        flag = True

        while flag:
            response = self.client.post(self.url, self.input, format="json")
            flag = response.status_code == status.HTTP_200_OK

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheduling_algorithm_with_assigns_busy_room_and_falls_back_to_another(self):
        self.client.force_authenticate(user=self.administrator)

        flag = True

        while flag:
            response = self.client.post(self.url, self.input, format="json")
            flag = response.status_code == status.HTTP_200_OK

        self.assertTrue(Appointment.objects.filter(room=self.another_room).exists())

    def test_scheduling_algorithm_with_no_rooms_available(self):
        self.client.force_authenticate(user=self.administrator)

        self.another_room.delete()
        flag = True

        while flag:
            response = self.client.post(self.url, self.input, format="json")
            flag = response.status_code == status.HTTP_200_OK

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

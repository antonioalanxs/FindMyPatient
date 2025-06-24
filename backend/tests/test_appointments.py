from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class AppointmentListTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("appointments-list")

    def test_list_appointments_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ListAppointmentsByPatientTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda patient_id: reverse("appointments-by-patient", kwargs={"patient_id": patient_id})

    def test_list_appointments_by_patient_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_appointments_by_patient_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_by_patient_with_doctor_who_does_not_have_assigned_patient(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url(self.patient_without_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_appointments_by_patient_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_appointments_by_patient_with_non_authenticated_user(self):
        response = self.client.get(self.url(self.patient_with_address_and_primary_doctor.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AppointmentCancellationTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda id: reverse("appointments-cancellation", kwargs={"id": id})

    def test_cancel_appointment_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.patch(self.url(self.appointment.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_appointment_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.appointment.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_appointment_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.patch(self.url(self.appointment.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cancel_appointment_with_non_authenticated_user(self):
        response = self.client.patch(self.url(self.appointment.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cancel_non_existing_appointment(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.patch(self.url(self.non_existing_id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class AppointmentCalendarTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = reverse("appointments-calendar")

    def test_get_calendar_with_doctor(self):
        self.client.force_authenticate(user=self.doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_calendar_with_patient(self):
        self.client.force_authenticate(user=self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_calendar_with_administrator(self):
        self.client.force_authenticate(user=self.administrator)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_calendar_with_non_authenticated_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

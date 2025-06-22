from config.settings import (
    EXPORT_EXTENSION_PARAMETER,
    EXCEL_EXTENSION,
    JSON_EXTENSION
)
from rest_framework import status
from rest_framework.reverse import reverse

from .tests_helper import TestSetUp


class DatabaseAPIViewTestCase(TestSetUp):
    def setUp(self):
        super().setUp()
        self.url = lambda extension: f"{reverse('database-export')}?{EXPORT_EXTENSION_PARAMETER}={extension}"
        self.non_existing_extension = "test"

    def test_export_database_with_patient(self):
        self.client.force_authenticate(self.patient_with_address_and_primary_doctor)
        response = self.client.get(self.url(EXCEL_EXTENSION))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_export_database_with_non_authenticated_user(self):
        response = self.client.get(self.url(EXCEL_EXTENSION))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _test_export_with_user_and_extension(self, user, extension, expected_content_type):
        self.client.force_authenticate(user)
        response = self.client.get(self.url(extension))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], expected_content_type)

    def test_export_database_with_doctor_excel(self):
        self._test_export_with_user_and_extension(
            self.doctor,
            EXCEL_EXTENSION,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    def test_export_database_with_doctor_json(self):
        self._test_export_with_user_and_extension(
            self.doctor,
            JSON_EXTENSION,
            "application/json"
        )

    def test_export_database_with_administrator_excel(self):
        self._test_export_with_user_and_extension(
            self.administrator,
            EXCEL_EXTENSION,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

    def test_export_database_with_administrator_json(self):
        self._test_export_with_user_and_extension(
            self.administrator,
            JSON_EXTENSION,
            "application/json"
        )

    def test_export_database_with_invalid_extension(self):
        self.client.force_authenticate(self.administrator)
        response = self.client.get(self.url(self.non_existing_extension))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

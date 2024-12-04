from rest_framework.test import APITestCase

from users.models import Patient


class TestSetUp(APITestCase):
    """
        Test case class that configures common resources and configurations for API testing.
    """
    def __set_user(self):
        self.user = Patient.objects.create(
            username="root",
            birth_date="2024-07-04"
        )

        self.user.set_password("root")

        self.user.save()

    def setUp(self):
        self.__set_user()

        return super().setUp()

from appointments.models import Appointment
from config.settings import ROLES

from django.contrib.auth.models import Group

from rest_framework.test import APITestCase

from base.models import User
from patients.models import Patient
from addresses.models import Address
from doctors.models import Doctor
from administrators.models import Administrator
from medical_specialties.models import MedicalSpecialty
from rooms.models import Room
from schedules.models import Schedule


class TestSetUp(APITestCase):
    """
        Test case class that configures common resources and configurations for API testing.
    """

    def __set_users(self):
        self.group_ids = []

        for key, value in ROLES.items():
            group = Group.objects.create(name=value)
            self.group_ids.append(group.id)
            group.save()

        self.user = User.objects.create(
            username="test",
            birth_date="2024-07-04",
            phone_number="test",
            identity_card_number="test",
        )
        self.user.set_password("test")

        self.doctor = Doctor.objects.create(
            username="test2",
            birth_date="2024-07-04",
            phone_number="test2",
            identity_card_number="test2",
            collegiate_code="test2"
        )

        self.address_input = {
            "street": "test",
            "city": "test",
            "zip_code": "test",
            "country": "test",
        }

        self.address = Address.objects.create(**self.address_input)

        self.patient_with_address_and_primary_doctor = Patient.objects.create(
            username="test3",
            birth_date="2024-07-04",
            phone_number="test3",
            identity_card_number="test3",
            social_security_code="test3",
            address=self.address
        )
        self.patient_with_address_and_primary_doctor.primary_doctor = self.doctor

        self.patient_without_address_and_primary_doctor = Patient.objects.create(
            username="test4",
            birth_date="2024-07-04",
            phone_number="test4",
            identity_card_number="test4",
            social_security_code="test4",
        )

        self.administrator = Administrator.objects.create(
            username="test5",
            birth_date="2024-07-04",
            phone_number="test5",
            identity_card_number="test5",
        )

        self.another_doctor = Doctor.objects.create(
            username="test6",
            birth_date="2024-07-04",
            phone_number="test6",
            identity_card_number="test6",
            collegiate_code="test6"
        )

        self.user.save()
        self.doctor.save()
        self.address.save()
        self.patient_with_address_and_primary_doctor.save()
        self.patient_without_address_and_primary_doctor.save()
        self.administrator.save()
        self.another_doctor.save()

    def __set_medical_specialties(self):
        self.medical_specialty_input = {
            "name": "testtest",
            "description": "testtesttesttesttesttesttesttest",
        }

        self.medical_specialty = MedicalSpecialty.objects.create(
            **self.medical_specialty_input
        )

        self.doctor.medical_specialty = self.medical_specialty
        self.another_doctor.medical_specialty = self.medical_specialty

        self.room_input = {
            "name": "Test Room",
            "location": "test",
            "capacity": 1,
        }

        self.room = Room.objects.create(**self.room_input)
        self.room.medical_specialty = self.medical_specialty

        self.room_input["name"] = "Another Room Test"

        self.another_room = Room.objects.create(**self.room_input)
        self.another_room.medical_specialty = self.medical_specialty

        self.room.save()
        self.another_room.save()
        self.doctor.save()
        self.another_doctor.save()

    def __set_appointments(self):
        self.appointment_input = {
            "schedule": Schedule.objects.create(
                start_time="2024-07-04T10:00:00Z",
                end_time="2024-07-04T11:00:00Z"
            ),
            "patient": self.patient_with_address_and_primary_doctor,
            "doctor": self.doctor,
            "medical_specialty": self.medical_specialty,
            "room": self.room,
        }

        self.appointment = Appointment.objects.create(**self.appointment_input)

    def setUp(self):
        self.non_existing_id = 999999
        self.__set_users()
        self.__set_medical_specialties()
        self.__set_appointments()

        return super().setUp()

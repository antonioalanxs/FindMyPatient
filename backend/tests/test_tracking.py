from config import settings

from unittest import mock

from django.conf import settings
from django.test import TransactionTestCase

from channels.testing import WebsocketCommunicator


class TrackingConsumerTest(TransactionTestCase):
    async def test_tracking_consumer(self):
        with mock.patch.object(settings, 'CHANNEL_LAYERS', {
            "default": {
                "BACKEND": "channels.layers.InMemoryChannelLayer",
            },
        }):
            from config.asgi import application

            doctor_identifier = "1"
            patient_identifier = "1"

            communicator = WebsocketCommunicator(
                application,
                f"/ws/tracking/channel/doctor/{doctor_identifier}/patient/{patient_identifier}"
            )

            is_communicator_connected, _ = await communicator.connect()
            self.assertTrue(is_communicator_connected)

            message = {
                'latitude': 40.7128,
                'longitude': -74.0060
            }

            await communicator.send_json_to(message)

            response = await communicator.receive_json_from()
            self.assertEqual(response['latitude'], message['latitude'])
            self.assertEqual(response['longitude'], message['longitude'])

            await communicator.disconnect()
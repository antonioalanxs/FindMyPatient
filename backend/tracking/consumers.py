import json

from channels.generic.websocket import AsyncWebsocketConsumer


class TrackingConsumer(AsyncWebsocketConsumer):
    """
    This class is responsible for handling the WebSocket connection between the doctor and the patient.

    The patient will be able to send their location to the doctor in real-time.

    As there are different doctors assigned to different patients, the consumer will be able to handle multiple
    connections via channels.

    Each channel will be identified by the doctor and patient identifiers. For example, the channel name for the
    connection between doctor 1 and patient 1 will be `doctor_1_patient_1`.

    Attributes:
        doctor_identifier (str): The identifier of the doctor.
        patient_identifier (str): The identifier of the patient.
        group_name (str): The name of the group where the doctor and patient will be connected.
    """

    async def connect(self):
        """
        Connect to the WebSocket and enter to an assigned channel.
        """
        self.doctor_identifier = self.scope['url_route']['kwargs']['doctor_identifier']
        self.patient_identifier = self.scope['url_route']['kwargs']['patient_identifier']
        self.group_name = f'doctor_{self.doctor_identifier}_patient_{self.patient_identifier}'

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Disconnect from the WebSocket and leave the assigned channel
        """
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Receive the location of the patient and send it to the doctor.
        """
        data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'send_message',
                'latitude': data['latitude'],
                'longitude': data['longitude']
            }
        )

    async def send_message(self, event):
        """
        Send the location of the patient to the doctor.
        """
        await self.send(text_data=json.dumps({
            'latitude': event['latitude'],
            'longitude': event['longitude']
        }))

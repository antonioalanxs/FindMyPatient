import json
from channels.generic.websocket import AsyncWebsocketConsumer


class TrackingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.doctor_identifier = self.scope['url_route']['kwargs']['doctor_identifier']
        self.patient_identifier = self.scope['url_route']['kwargs']['patient_identifier']

        self.group_name = f'doctor_{self.doctor_identifier}_patient_{self.patient_identifier}'

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
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
        await self.send(text_data=json.dumps({
            'latitude': event['latitude'],
            'longitude': event['longitude']
        }))

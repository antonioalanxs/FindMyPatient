import json

from channels.generic.websocket import WebsocketConsumer

class TrackingConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'Connection established to the WebSocket server.'
        }))
from config.settings import WEB_SOCKET_TRACKING_PATH
from django.urls import re_path

from . import consumers

ROUTE = WEB_SOCKET_TRACKING_PATH \
    .replace('{doctor}', r'(?P<doctor_identifier>\w+)') \
    .replace('{patient}', r'(?P<patient_identifier>\w+)') + '$'

websocket_urlpatterns = [
    re_path(
        ROUTE,
        consumers.TrackingConsumer.as_asgi()
    ),
]
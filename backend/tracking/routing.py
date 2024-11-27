from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(
        r'ws/tracking/channel/doctor/(?P<doctor_identifier>\w+)/patient/(?P<patient_identifier>\w+)$',
        consumers.TrackingConsumer.as_asgi()
    ),
]
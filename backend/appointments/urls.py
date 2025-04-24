from django.urls import path

from .views import RequestAppointmentAPIView

urlpatterns = [
    path(
        "request",
        RequestAppointmentAPIView.as_view(),
        name="request_appointment",
    ),
]

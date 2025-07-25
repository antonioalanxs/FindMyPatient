from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    AppointmentViewSet,
    CancelAppointmentAPIView,
    AppointmentCalendarAPIView,
    ListAppointmentsByPatientAPIView
)

router = DefaultRouter()
router.register(r'', AppointmentViewSet, basename='appointments')

urlpatterns = router.urls + [
    path(
        '<int:id>/cancellation',
        CancelAppointmentAPIView.as_view(),
        name='appointments-cancellation'
    ),
    path(
        'calendar',
        AppointmentCalendarAPIView.as_view(),
        name='appointments-calendar'
    ),
    path(
        'patients/<int:patient_id>/',
        ListAppointmentsByPatientAPIView.as_view(),
        name='appointments-by-patient'
    ),
]

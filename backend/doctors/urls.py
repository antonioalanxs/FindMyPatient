from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    DoctorViewSet,
    ListPatientsByDoctorAPIView
)

router = DefaultRouter()
router.register(r'', DoctorViewSet, basename='doctors')

urlpatterns = router.urls + [
    path(
        '<int:id>/patients',
        ListPatientsByDoctorAPIView.as_view(),
        name='doctors-patients'
    ),
]

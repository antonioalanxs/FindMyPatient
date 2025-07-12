from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    MedicalSpecialtyViewSet,
    ListDoctorsByMedicalSpecialtyAPIView,
    ListRoomsByMedicalSpecialtyAPIView
)

router = DefaultRouter()
router.register(r'', MedicalSpecialtyViewSet, basename='medical_specialties')

urlpatterns = router.urls + [
    path(
        '<int:pk>/doctors',
        ListDoctorsByMedicalSpecialtyAPIView.as_view(),
        name='medical_specialties-doctors'
    ),

    path(
        '<int:pk>/rooms',
        ListRoomsByMedicalSpecialtyAPIView.as_view(),
        name='medical_specialties-rooms'
    )
]

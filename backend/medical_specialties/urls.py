from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import MedicalSpecialtyViewSet, ListDoctorsByMedicalSpecialtyAPIView

router = DefaultRouter()
router.register(r'', MedicalSpecialtyViewSet, basename='medical_specialties')

urlpatterns = router.urls + [
    path(
        '<int:pk>/doctors',
        ListDoctorsByMedicalSpecialtyAPIView.as_view(),
        name='medical_specialties-doctors'
    ),
]

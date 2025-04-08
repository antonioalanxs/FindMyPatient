from rest_framework.routers import DefaultRouter

from .views import MedicalSpecialtyViewSet

router = DefaultRouter()
router.register(r'', MedicalSpecialtyViewSet, basename='medical_specialties')

urlpatterns = router.urls

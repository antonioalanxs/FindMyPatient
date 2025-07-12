from rest_framework.routers import DefaultRouter

from .views import MedicalTestViewSet

router = DefaultRouter()
router.register(r'', MedicalTestViewSet, basename='medical_tests')

urlpatterns = router.urls

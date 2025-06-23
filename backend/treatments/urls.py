from rest_framework.routers import DefaultRouter

from .views import TreatmentViewSet

router = DefaultRouter()
router.register(r'', TreatmentViewSet, basename='treatments')

urlpatterns = router.urls

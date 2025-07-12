from rest_framework.routers import DefaultRouter

from .views import AdministratorViewSet

router = DefaultRouter()
router.register(r'', AdministratorViewSet, basename='administrators')

urlpatterns = router.urls

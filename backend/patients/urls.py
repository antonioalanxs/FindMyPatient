from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import PatientViewSet
from addresses.views import AddressRetrieveUpdateAPIView

router = DefaultRouter()
router.register(r'', PatientViewSet, basename='patients')

urlpatterns = router.urls + [
    path('<int:id>/address', AddressRetrieveUpdateAPIView.as_view(), name='patient-address'),
]

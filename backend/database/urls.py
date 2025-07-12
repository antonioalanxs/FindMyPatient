from django.urls import path

from .views import DatabaseAPIView

urlpatterns = [
    path('', DatabaseAPIView.as_view(), name='database-export'),
]

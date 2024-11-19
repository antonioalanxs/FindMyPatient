from django.urls import path

from .views import change_address

urlpatterns = [
    path('address', change_address, name='address'),
]

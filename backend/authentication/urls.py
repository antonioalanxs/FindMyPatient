from django.urls import path
from .views import hello_world, HelloWorldAPIView

urlpatterns = [
    path('hello-world/', hello_world, name='hello-world'),
    path('hello-world-api-view/', HelloWorldAPIView.as_view(), name='hello-world-api-view'),
]

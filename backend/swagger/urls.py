from django.urls import re_path, path

from rest_framework import permissions

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from constants import BRAND_NAME

swagger_information = openapi.Info(
    title=f"{BRAND_NAME} RESTful API Documentation",
    description=f"{BRAND_NAME} RESTful API Documentation",
    default_version="",
    security_definitions={
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    contact=openapi.Contact(email="antoniojalanis7131@gmail.com"),
    terms_of_service="https://www.google.com/policies/terms/",
    license=openapi.License(name="BSD License"),
)

schema_view = get_schema_view(
    info=swagger_information,
    permission_classes=(permissions.AllowAny,),
    public=True,
)

urlpatterns = [
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name="schema-json"
    ),
    path(
        "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui"
    ),
    path(
        "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc"
    ),
]

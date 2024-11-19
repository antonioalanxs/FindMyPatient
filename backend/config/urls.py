"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include


def include_api_path(application_name, resource_name=None):
    """
    Include the urls of an application in the api path.

    Args:
        resource_name (str, optional): The name of the resource.
        application_name (str): The name of the application.

    Returns:
        django.urls.path: The path to include the urls of the application.
    """
    resource_name = resource_name if resource_name is not None else application_name
    return path(f'api/{resource_name}/', include(f'{application_name}.urls'))


urlpatterns = [
    path('admin/', admin.site.urls),

    include_api_path('swagger'),
    include_api_path('authentication'),
    include_api_path('jwt_', 'tokens'),
    include_api_path('users'),
]

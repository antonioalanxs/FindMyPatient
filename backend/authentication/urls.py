from django.urls import path

from .views import LoginView, PasswordResetRequestView, PasswordResetView, LogoutView, ChangePasswordView

urlpatterns = [
    path(
        'login',
        LoginView.as_view(),
        name="login"
    ),
    path(
        'reset',
        PasswordResetRequestView.as_view(),
        name='reset_password_request'
    ),
    path(
        'reset/<str:token>',
        PasswordResetView.as_view(),
        name='reset_password'
    ),
    path(
        'logout',
        LogoutView.as_view(),
        name='logout'
    ),
    path(
        'password',
        ChangePasswordView.as_view(),
        name='change_password'
    )
]

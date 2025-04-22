from rest_framework.permissions import BasePermission

from patients.models import Patient
from doctors.models import Doctor
from administrators.models import Administrator


def is_patient(user):
    return Patient.objects.filter(id=user.id).exists()


def is_doctor(user):
    return Doctor.objects.filter(id=user.id).exists()


def is_administrator(user):
    return Administrator.objects.filter(id=user.id).exists()


def is_self(request, view):
    return request.user.id == int(view.kwargs.get('id'))


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return is_patient(request.user)


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return is_doctor(request.user)


class IsAdministrator(BasePermission):
    def has_permission(self, request, view):
        return is_administrator(request.user)


class IsDoctorOrIsAdministrator(BasePermission):
    def has_permission(self, request, view):
        return is_doctor(request.user) or is_administrator(request.user)


class IsDoctorOrIsAdministratorOrIsSelf(BasePermission):
    def has_permission(self, request, view):
        return is_doctor(request.user) or is_administrator(request.user) or is_self(request, view)


class IsAdministratorOrIsSelf(BasePermission):
    def has_permission(self, request, view):
        return is_administrator(request.user) or is_self(request, view)

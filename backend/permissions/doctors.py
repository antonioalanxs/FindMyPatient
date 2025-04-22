from rest_framework.permissions import BasePermission

from permissions.users import is_administrator, is_self, is_doctor
from doctors.models import Doctor


def is_doctor_assigned_patient(view, request):
    doctor_id = view.kwargs.get('id')
    patient_id = request.user.id

    return Doctor.objects.filter(
        id=doctor_id,
        patients__id=patient_id
    ).exists()


def is_administrator_or_is_doctor_assigned_patient(view, request):
    return is_administrator(request.user) or is_doctor_assigned_patient(view, request)


class IsAdministratorOrIsDoctorAssignedPatient(BasePermission):
    def has_permission(self, request, view):
        return is_administrator_or_is_doctor_assigned_patient(view, request)


class IsAdministratorOrIsDoctorAndIsSelf(BasePermission):
    def has_permission(self, request, view):
        return is_administrator(request.user) or (is_doctor(request.user) and is_self(request, view))

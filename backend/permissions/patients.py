from rest_framework.permissions import BasePermission

from permissions.users import is_administrator, is_self, is_patient
from patients.models import Patient


def is_patient_assigned_doctor(view, request):
    patient_id = (view.kwargs.get('id', None) or
                  view.kwargs.get('patient_id', None) or
                  request.query_params.get('patient', None))
    doctor_id = request.user.id

    return Patient.objects.filter(
        id=patient_id,
        primary_doctor_id=doctor_id
    ).exists()


def is_administrator_or_is_patient_assigned_doctor(view, request):
    return is_administrator(request.user) or is_patient_assigned_doctor(view, request)


class IsAdministratorOrIsPatientAssignedDoctor(BasePermission):
    def has_permission(self, request, view):
        return is_administrator_or_is_patient_assigned_doctor(view, request)


class IsAdministratorOrIsPatientOrIsPatientAssignedDoctor(BasePermission):
    def has_permission(self, request, view):
        return is_administrator(request.user) or is_patient(request.user) or is_patient_assigned_doctor(view, request)


class IsAdministratorOrIsPatientAssignedDoctorOrIsSelf(BasePermission):
    def has_permission(self, request, view):
        return is_administrator_or_is_patient_assigned_doctor(view, request) or is_self(request, view)

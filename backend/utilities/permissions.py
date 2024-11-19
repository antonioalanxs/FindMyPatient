from rest_framework.permissions import BasePermission

from users.models import Patient

class IsPatient(BasePermission):
    """
    This permission class checks if the user is a patient.
    """

    def has_permission(self, request, view):
        """
        Check if the user is a patient.

        Args:
            request (rest_framework.request.Request): The request object.
            view (rest_framework.viewsets.ViewSet): The view object.

        Returns:
            bool: True if the user is a patient, False otherwise.
        """
        return Patient.objects.filter(id=request.user.id).exists()
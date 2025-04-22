from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from patients.models import Patient
from utilities.models import get_role_


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["first_name"] = user.first_name
        token["role"] = get_role_(user)

        patient = Patient.objects.filter(user_ptr_id=user.id).first()
        patient and token.__setitem__("primary_doctor_id", patient.primary_doctor_id)

        return token

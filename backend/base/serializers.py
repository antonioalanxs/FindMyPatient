from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def to_representation(self, instance):
        from users.models import Administrator, Doctor, Patient

        id_ = instance.id
        object_ = (Administrator.objects.filter(id=id_) or
                   Doctor.objects.filter(id=id_) or
                   Patient.objects.filter(id=id_))

        data = object_.values().first()

        data["date_joined"] = instance.date_joined.isoformat()
        data["birth_date"] = instance.birth_date.isoformat()
        data["role"] = instance.role

        data.pop("id")
        data.pop("user_ptr_id")
        data.pop("password")
        data.pop("reset_password_token")
        data.pop("is_active")
        data.pop("last_login")

        return data

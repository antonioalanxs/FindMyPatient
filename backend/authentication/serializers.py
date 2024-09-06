from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining a JSON Web Token pair and return more data in responses.
    """
    pass
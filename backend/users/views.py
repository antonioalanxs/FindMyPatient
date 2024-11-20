from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from users.models import Patient
from utilities.permissions import IsPatient

@swagger_auto_schema(
    method='patch',
    operation_summary='Change the address of the patient.',
    operation_description='Change the address of the patient.',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'street': openapi.Schema(type=openapi.TYPE_STRING, description='Street.'),
            'city': openapi.Schema(type=openapi.TYPE_STRING, description='City.'),
            'state': openapi.Schema(type=openapi.TYPE_STRING, description='State.'),
            'country': openapi.Schema(type=openapi.TYPE_STRING, description='Country.'),
            'zip_code': openapi.Schema(type=openapi.TYPE_STRING, description='Zip code.'),
        }
    ),
    responses={
        200: openapi.Response(
            description='Address updated successfully.',
            examples={
                'application/json': {
                    'message': 'Address updated successfully.',
                }
            }
        ),
        401: openapi.Response(
            description="Unauthorized.",
            examples={
                "application/json": [
                    {
                        "detail": "Authentication credentials were not provided."
                    },
                    {
                        "detail": "Given token not valid for any token type",
                        "code": "token_not_valid",
                        "messages": [
                            {
                                "token_class": "AccessToken",
                                "token_type": "access",
                                "message": "Token is invalid or expired"
                            }
                        ]
                    }
                ]
            }
        )
    }
)
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsPatient])
def change_address(request, *args, **kwargs):
    user = Patient.objects.get(id=request.user.id)

    user.street = request.data.get('street', user.street)
    user.city = request.data.get('city', user.city)
    user.state = request.data.get('state', user.state)
    user.country = request.data.get('country', user.country)
    user.zip_code = request.data.get('zip_code', user.zip_code)

    user.save()

    return Response(status=status.HTTP_200_OK, data={
        'message': 'Address updated successfully.',
    })

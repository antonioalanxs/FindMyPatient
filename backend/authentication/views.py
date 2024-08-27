from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView


# Create your views here.

@swagger_auto_schema(
    method='get',
    operation_summary='Hello, World!',
    operation_description='This is a simple hello world endpoint.',
    responses={
        200: openapi.Response(
            'Hello, World!',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Hello, World!'
                    )
                }
            )
        )
    }
)
@api_view(['GET'])
def hello_world(request):
    return Response(status=HTTP_200_OK, data={'message': 'Hello, World!'})


class HelloWorldAPIView(APIView):
    @swagger_auto_schema(
        operation_summary='Hello, World!',
        operation_description='This is a simple hello world endpoint.',
        responses={
            200: openapi.Response(
                'Hello, World!',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Hello, World!'
                        )
                    }
                )
            )
        }
    )
    def get(self, request):
        return Response(status=HTTP_200_OK, data={'message': 'Hello, World!'})

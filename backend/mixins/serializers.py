from rest_framework.response import Response
from rest_framework import status


class SerializerValidationErrorResponseMixin:
    def __extract_error_messages(self, errors):
        messages = []

        for key, value in errors.items():
            if isinstance(value, dict):
                messages.extend(self.__extract_error_messages(value))

            if isinstance(value, list):
                for error in value:
                    messages.append(error)

        return messages

    def handle_serializer_is_not_valid_response(self, serializer):
        error_messages = self.__extract_error_messages(serializer.errors)
        detail = "<br />".join(error_messages)

        return Response({'detail': detail}, status=status.HTTP_400_BAD_REQUEST)

from config.settings import (
    EXPORT_EXTENSION_QUERY_PARAMETER,
    JSON_EXTENSION,
    EXCEL_EXTENSION
)

from rest_framework import (
    status,
    views
)
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated

from permissions.users import IsDoctorOrIsAdministrator
from .algorithm import (
    export_database,
    exporter
)


class DatabaseAPIView(views.APIView):
    permission_classes = [IsAuthenticated, IsDoctorOrIsAdministrator]
    extensions = {EXCEL_EXTENSION, JSON_EXTENSION}

    def get(self, request, *args, **kwargs):
        extension = request.GET.get(
            EXPORT_EXTENSION_QUERY_PARAMETER,
            EXCEL_EXTENSION
        ).lower()

        if extension in self.extensions:
            database = export_database(request.user.id)
            return exporter[extension](database)

        return Response(
            {"detail": f"Supported formats are {self.extensions}."},
            status=status.HTTP_400_BAD_REQUEST
        )

from config.settings import (
    DEFAULT_PAGINATION_SIZE,
    PAGINATION_PAGE_SIZE_PARAMETER,
    PAGINATION_PARAMETER
)

from rest_framework.pagination import PageNumberPagination


class ConfigurablePagination(PageNumberPagination):
    page_query_param = PAGINATION_PARAMETER
    page_size_query_param = PAGINATION_PAGE_SIZE_PARAMETER

    def __init__(self, page_size=DEFAULT_PAGINATION_SIZE, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_size = page_size


class PaginationMixin:
    def get_paginated_response_(self, request, queryset, serializer):
        paginator = ConfigurablePagination()

        data = serializer(
            paginator.paginate_queryset(queryset, request),
            many=True
        ).data

        return paginator.get_paginated_response(data)

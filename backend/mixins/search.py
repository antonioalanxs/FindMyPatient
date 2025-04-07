from config.settings import SEARCH_PARAMETER

from django.db.models import Q
from django.db import models


class SearchMixin:
    search_parameter = SEARCH_PARAMETER
    excluded_fields = []

    def __init__(self, search_parameter):
        if search_parameter is not None:
            self.search_parameter = search_parameter

    def set_search_excluded_fields(self, excluded_fields):
        self.excluded_fields = excluded_fields

    def __build_query_object(self, model, query):
        query_object = Q()

        for field in model._meta.fields:
            if field.name in self.excluded_fields:
                continue
            if isinstance(field, (models.CharField, models.TextField)):
                query_object |= Q(**{f"{field.name}__icontains": query})

        return query_object

    def __filter_queryset(self, model, query_object, base_queryset=None):
        if base_queryset is None:
            return model.objects.filter(query_object)

        return base_queryset.filter(query_object)

    def search(self, model, request, base_queryset=None):
        query = request.query_params.get(self.search_parameter, None)

        if not query:
            return base_queryset or model.objects.all()

        query_object = self.__build_query_object(model, query)

        return self.__filter_queryset(model, query_object, base_queryset=base_queryset)

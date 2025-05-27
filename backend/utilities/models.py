from django.db.models import QuerySet


def save(instance, field, value):
    setattr(instance, field, value)
    instance.save()
    return instance


def get_role_(obj):
    return obj.groups.values_list("name", flat=True).first()


def get_id(obj):
    if isinstance(obj, QuerySet):
        return [
            str(id_)
            for id_ in obj.values_list("id", flat=True)
        ]

    if isinstance(obj, list):
        return [
            str(o.id)
            for o in obj
        ]

    return str(obj.id)

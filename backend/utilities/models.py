def save(instance, field, value):
    setattr(instance, field, value)
    instance.save()
    return instance


def get_role_(obj):
    return obj.groups.values_list("name", flat=True).first()

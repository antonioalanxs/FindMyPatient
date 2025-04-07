def save(instance, field, value):
    setattr(instance, field, value)
    instance.save()
    return instance
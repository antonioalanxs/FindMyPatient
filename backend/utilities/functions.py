"""
    `utilities.functions` module.

    It contains functions that are used across the application.
"""

def save(instance, field, value):
    """
        Save a instance with a new value for a field.

        Parameters:
            - instance (object): The instance.
            - field (str): The field to update.
            - value (str): The new value for the field.

        Returns:
            - object: The instance with the new value.
    """
    setattr(instance, field, value)
    instance.save()
    return instance
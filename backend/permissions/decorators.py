import functools


def method_permission_classes(classes):
    """
        Decorator function to set permission classes on ViewSet methods.

        Parameters:
            classes (list): List of permission classes to be applied to the method.

        Returns:
            function (function): Decorator function that sets permission classes for a specific method.

        This function takes a list of permission classes and returns a decorator function. This decorator, in turn, applies the permission classes to a specific method in a ViewSet.
    """

    def decorator(function):
        """
            Internal decorator function that applies permission classes to the method.

            Parameters:
                function (function): Method to which permission classes will be applied.

            Returns:
                function (function): Decorated function that sets permission classes and checks permissions before executing the method.

            This internal decorator function takes the method to which permission classes will be applied and returns a decorated function that sets those classes and checks permissions before executing the method.
        """

        @functools.wraps(function)
        def decorator_function(self, *args, **kwargs):
            """
                Decorated function that sets permission classes and checks permissions before executing the method.

                Parameters:
                    - self (ViewSet): Instance of the ViewSet.

                Returns:
                    - object (object): Result of executing the method with applied permission classes.

                This decorated function sets the provided permission classes to the method and checks permissions before executing the method with the provided arguments.
            """
            self.permission_classes = classes
            self.check_permissions(self.request)

            return function(self, *args, **kwargs)

        return decorator_function

    return decorator

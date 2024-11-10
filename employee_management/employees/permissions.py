from rest_framework.permissions import BasePermission

class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.employee.role in ['admin', 'manager']
        )

class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsRegularUser(BasePermission):
    """
    Allows access only to regular (non-staff) users.
    """
    def has_permission(self, request, view):
        return request.user and not request.user.is_staff

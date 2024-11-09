from rest_framework.permissions import BasePermission

class IsAdminOrManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.employee.role in ['admin', 'manager']
        )

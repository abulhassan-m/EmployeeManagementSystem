from django.urls import path
from .views import SuperAdminRegistrationView, StaffRegistrationView

urlpatterns = [
    path('register/superadmin/', SuperAdminRegistrationView.as_view(), name='register_superadmin'),
    path('register/staff/', StaffRegistrationView.as_view(), name='register_staff'),
]

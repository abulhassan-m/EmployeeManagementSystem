from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from employees.views import EmployeeViewSet, employee_distribution_data, employee_distribution_html_chart  #, CustomTokenObtainPairView  
from departments.views import DepartmentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'departments', DepartmentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),    
    path('api/departments/', include('departments.urls')),  # Include department URLs
    path('api/users/', include('users.urls')),  # Include user registration URLs
    # path('api/token/',  CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/data/employee-distribution/', employee_distribution_data, name='employee-distribution-data'),
    path('api/plotly-chart/employee-distribution/', employee_distribution_html_chart, name='employee-distribution-plotly-chart'),
]
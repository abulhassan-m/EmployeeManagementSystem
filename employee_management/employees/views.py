import plotly.express as px
from django.http import HttpResponse
from departments.models import Department
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Employee
from .serializers import EmployeeSerializer, CustomTokenObtainPairSerializer
from .permissions import IsAdminOrManager, IsAdminUser

@api_view(['GET'])
def employee_distribution_data(request):
    departments = Department.objects.all()
    data = {
        'labels': [dept.name for dept in departments],
        'counts': [Employee.objects.filter(department=dept).count() for dept in departments],
    }
    return Response(data)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManager, IsAdminUser]

def employee_distribution_html_chart(request):
    departments = Department.objects.all()
    employee_counts = [Employee.objects.filter(department=dept).count() for dept in departments]
    department_names = [dept.name for dept in departments]

    fig = px.bar(
        x=department_names,
        y=employee_counts,
        labels={'x': 'Department', 'y': 'Number of Employees'},
        title="Employee Distribution by Department"
    )

    # Generate HTML
    html = fig.to_html(full_html=False)
    return HttpResponse(html)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
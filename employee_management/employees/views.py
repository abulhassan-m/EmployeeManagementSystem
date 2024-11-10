import plotly.express as px
from django.http import HttpResponse
from departments.models import Department
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Employee
from .serializers import EmployeeSerializer, CustomTokenObtainPairSerializer
from .permissions import IsAdminOrManager, IsAdminUser

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManager, IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def employee_distribution_data(request):
    departments = Department.objects.all()
    data = {
        'labels': [dept.name for dept in departments],
        'counts': [Employee.objects.filter(department=dept).count() for dept in departments],
    }
    return Response(data)

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
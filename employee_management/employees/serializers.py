from rest_framework import serializers
from .models import Employee
from departments.serializers import DepartmentSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

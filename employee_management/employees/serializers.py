from rest_framework import serializers
from .models import Employee
from departments.serializers import DepartmentSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'
        '''
        fields = [
            'id', 'first_name', 'last_name', 'date_of_birth', 'age', 'blood_group', 
            'height', 'weight', 'department', 'date_of_join', 'date_of_resign', 
            'no_of_leaves', 'salary', 'education', 'experience', 'father_name', 
            'mother_name', 'spouse_name', 'no_of_children', 'children_names'
        ]
        '''

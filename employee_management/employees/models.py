from django.db import models
from departments.models import Department

class Employee(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='staff')
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)

    # Basic Information
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    age = models.IntegerField(null=True, blank=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in cm
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # in kg

    # Job Information
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date_of_join = models.DateField()
    date_of_resign = models.DateField(null=True, blank=True)
    no_of_leaves = models.IntegerField(default=0)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    # Education & Experience
    education = models.CharField(max_length=100, blank=True)
    experience = models.TextField(blank=True)  # Details of previous jobs, etc.

    # Family Details
    father_name = models.CharField(max_length=100, blank=True)
    mother_name = models.CharField(max_length=100, blank=True)
    spouse_name = models.CharField(max_length=100, blank=True, null=True)
    no_of_children = models.IntegerField(default=0)
    children_names = models.TextField(blank=True, null=True)  # Store children names as comma-separated

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.department.name}"
'''
Age can be automatically calculated from date_of_birth, but it’s left as an editable field.
Children’s names are stored as a comma-separated string in children_names.
'''
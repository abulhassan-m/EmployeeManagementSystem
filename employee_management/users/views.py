from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer
from django.contrib.auth.models import User

class SuperAdminRegistrationView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request):
        data = request.data.copy()
        data['is_superuser'] = True
        data['is_staff'] = True  # Super admins are also staff

        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffRegistrationView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # Only admins can create staff

    def post(self, request):
        data = request.data.copy()
        data['is_superuser'] = False
        data['is_staff'] = True

        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

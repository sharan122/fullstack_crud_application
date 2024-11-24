from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

# Create your views here

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([AllowAny])
@api_view(['GET'])
def user_list(request):
    users = Customuser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    print(serializer)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully!', 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  
def delete_user(request, user_id):
    user = get_object_or_404(Customuser, id=user_id)
    if user == request.user:
        return Response({'message': "You cannot delete your own account."}, status=status.HTTP_400_BAD_REQUEST)
    user.delete()
    return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def edit_profile(request):

    user = request.user  # Get the authenticated user
    serializer = CustomUserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()  
        return Response({'message': 'Profile updated successfully!', 'user': serializer.data}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
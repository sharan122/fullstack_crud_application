from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
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



@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    print(password)

    user = authenticate(request, username=username, password=password)
    print(user)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'user':user.username,
            'email':user.email,
            'is_active':user.is_active,
            'is_staff':user.is_staff,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    


User = get_user_model()  

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def user_details_view(request):
  
    user = request.user
    
 
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'phone_number': user.phone_number,  
        'image': user.image.url if user.image else None, 
    }
    return Response(user_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])  
def delete_user(request, user_id):
    print(user_id)
    user = get_object_or_404(Customuser, id=user_id)
    print(user)
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    # Delete the user's token to log them out
    request.user.auth_token.delete()
    return Response({"message": "Successfully logged out."}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def block_user(request,id):
    print(id)
    user =  get_object_or_404(Customuser, id=id) 
    print(user)
    user.is_active = not user.is_active
    user.save()
    status_message = 'blocked' if not user.is_active else 'unblocked'
    return Response(
        {'message': f'User successfully {status_message}.'},
        status=status.HTTP_200_OK
    )
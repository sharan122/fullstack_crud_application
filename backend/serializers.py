from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # To ensure the password isn't returned

    class Meta:
        model = Customuser
        fields = ['username', 'email', 'password', 'image', 'phone_number']
        
        
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

    def validate_email(self, value):
        if Customuser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = Customuser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        # Add optional fields
        user.phone_number = validated_data.get('phone_number', None)
        user.image = validated_data.get('image', None)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        """Update user profile"""
        # Extract password if provided and hash it
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)  # Hash the new password
        instance.save()
        return instance
    

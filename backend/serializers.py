from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # To ensure the password isn't returned

    class Meta:
        model = Customuser
        fields = ['username', 'email', 'password', 'image', 'phone_number']

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
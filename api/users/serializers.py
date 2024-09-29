from typing import Dict, Any

from django.contrib.auth import get_user_model, user_logged_in
from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers

from .models import Follower

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source="get_full_name", required=False, read_only=True)
    preferences = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "full_name", "bio", "avatar", "preferences"]
        read_only_fields = ["id", "first_name", "last_name", "full_name", "bio", "avatar"]

    def get_preferences(self, obj):
        return obj.preferences.all().values_list('name', flat=True)


class CustomTokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    """

    CustomTokenObtainPairSerializer

    A custom subclass of `serializers.TokenObtainPairSerializer` that adds additional functionality during validation.

    Methods:
        - validate(attrs: dict) -> dict:
            Validates the input attributes and returns the validated data.

    Attributes:
        - None

    """

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        result = super().validate(attrs)
        user_logged_in.send(sender=self.__class__, user=self.user)
        return result


class FollowerSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    followed_user = UserSerializer(read_only=True)

    class Meta:
        model = Follower
        fields = ["id", "follower", "followed_user", "followed_at"]


class ListFollowersSerializer(serializers.ModelSerializer):
    followers = FollowerSerializer(many=True, read_only=True)

    class Meta:
        model = Follower

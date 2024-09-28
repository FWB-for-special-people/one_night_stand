from rest_framework import serializers

from channels import models
from users.serializers import UserSerializer


class ChannelSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = models.Channel
        fields = ["id", "name", "description", "members"]
        read_only_fields = ["id", "members"]

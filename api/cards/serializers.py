from rest_framework import serializers

from . import models


class CardSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    view_count = serializers.IntegerField(source='views.count', read_only=True)

    class Meta:
        model = models.Card
        fields = ["id", "text", "created_by", "created_at", "tags", "like_count", "view_count"]
        read_only_fields = ["id", "created_by", "created_at", "like_count", "view_count"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["id", "text", "created_by", "created_at"]
        read_only_fields = ["id", "created_by", "created_at"]

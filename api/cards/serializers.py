from rest_framework import serializers

from cards import models
from channels import models as channel_models, serializers as channel_serializers


class CardSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    view_count = serializers.IntegerField(source='views.count', read_only=True)
    channels = serializers.PrimaryKeyRelatedField(queryset=channel_models.Channel.objects.all(), many=True,
                                                  required=False)

    class Meta:
        model = models.Card
        fields = ["id", "text", "created_by", "created_at", "like_count", "view_count", "difficulty",
                  "expected_time", "tags", "channels"]
        read_only_fields = ["id", "created_by", "created_at", "like_count", "view_count", "tags", "difficulty", "expected_time", "channels"]

    def get_tags(self, obj):
        return obj.tags.all().values_list('name', flat=True)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["id", "text", "created_by", "created_at"]
        read_only_fields = ["id", "created_by", "created_at"]

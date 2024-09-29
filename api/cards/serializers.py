from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from cards import models
from cards.models import CardImage
from channels import models as channel_models


class CardImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CardImage
        fields = ["id", "image", "created_by", "created_at", "is_public"]
        read_only_fields = ["id", "created_by", "created_at"]


class CardSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    view_count = serializers.IntegerField(source='views.count', read_only=True)
    channels = serializers.PrimaryKeyRelatedField(queryset=channel_models.Channel.objects.all(), many=True,
                                                  required=False)
    image = CardImageSerializer(read_only=True)
    image_id = serializers.PrimaryKeyRelatedField(queryset=CardImage.objects.all(), write_only=True)

    class Meta:
        model = models.Card
        fields = ["id", "text", "created_by", "created_at", "like_count", "view_count", "difficulty",
                  "expected_time", "tags", "channels", "image", "image_id"]
        read_only_fields = ["id", "created_by", "created_at", "like_count", "view_count", "tags", "difficulty",
                            "expected_time", "channels", "image"]

    def get_tags(self, obj):
        return obj.tags.all().values_list('name', flat=True)

    def validate_image_id(self, image):
        if image.is_public or image.created_by == self.context["request"].user:
            return image.id

        raise ValidationError("Invalid card image.")


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["id", "text", "created_by", "created_at"]
        read_only_fields = ["id", "created_by", "created_at"]

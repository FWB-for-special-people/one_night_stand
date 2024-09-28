from attr import filters
from django.db.models import Count
from django.utils import timezone
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from cards import serializers, models


class CardViewSet(viewsets.ViewSetMixin, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = serializers.CardSerializer
    queryset = models.Card.objects.all()

    def filter_queryset(self, queryset):
        if channel := self.request.query_params.get("channel"):
            queryset = queryset.filter(channels=channel)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(methods=["PATCH"], detail=True)
    def view(self, *args, **kwargs):
        models.CardView.objects.update_or_create(
            card=self.get_object(),
            user=self.request.user,
            create_defaults={
                "viewed_at": timezone.now(),
            }
        )
        return Response(status=status.HTTP_200_OK)

    @action(methods=["PATCH"], detail=True)
    def like(self, *args, **kwargs):
        models.CardLike.objects.update_or_create(
            card=self.get_object(),
            user=self.request.user,
            create_defaults={
                "liked_at": timezone.now(),
            },
        )
        return Response(status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSetMixin, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = serializers.CommentSerializer
    queryset = models.Comment.objects.all().order_by("created_at")

    def filter_queryset(self, queryset):
        return queryset.filter(card_id=self.kwargs['card_id'])

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, card_id=self.kwargs["card_id"])

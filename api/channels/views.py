from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from channels import models, serializers
from cards import serializers as card_serializers

class ChannelViewSet(viewsets.ViewSetMixin, generics.ListCreateAPIView, generics.RetrieveAPIView):
    queryset = models.Channel.objects.all()
    serializer_class = serializers.ChannelSerializer

    def perform_create(self, serializer):
        channel = serializer.save(created_by=self.request.user)
        channel.members.add(self.request.user)

    @action(methods=["PATCH"], detail=True)
    def follow(self, *args, **kwargs):
        channel = self.get_object()
        channel.members.add(self.request.user)
        return Response(status=status.HTTP_200_OK)

    @action(methods=["PATCH"], detail=True)
    def unfollow(self, *args, **kwargs):
        channel = self.get_object()
        channel.members.remove(self.request.user)
        return Response(status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=False)
    def followed(self, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(members=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response

from channels import models, serializers


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

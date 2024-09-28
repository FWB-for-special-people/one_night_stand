import logging

from django.contrib.auth import get_user_model
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Follower
from .serializers import FollowerSerializer, UserSerializer

User = get_user_model()
logger = logging.getLogger(__name__)


class FollowUserView(viewsets.ModelViewSet):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=['POST'], detail=True)
    def follow(self, request, pk=None):
        user_to_follow = get_object_or_404(User, pk=pk)

        if user_to_follow == self.request.user:
            return Response({"detail": "You can't follow yourself, duh..."}, status=status.HTTP_400_BAD_REQUEST)

        follow, created = Follower.objects.get_or_create(followed_user=user_to_follow, follower=self.request.user)

        if created:
            return Response({"detail": f"You are now following {user_to_follow.email}."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": f"You are already following {user_to_follow.email}."}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=True)
    def unfollow(self, request, pk=None):
        user_to_unfollow = get_object_or_404(User, pk=pk)

        follow_instance = self.get_queryset().filter(follower=request.user, followed_user=user_to_unfollow)

        if follow_instance.exists():
            follow_instance.delete()
            return Response({"detail": f"You have unfollowed {user_to_unfollow.username}."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": f"You are not following {user_to_unfollow.username}."},
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def followers(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        followers = user.followers.select_related("follower").all()
        followers = [follower.follower for follower in followers]
        serializer = UserSerializer(followers, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        following = user.followed_users.select_related("followed_user").all()
        following = [followed.followed_user for followed in following]
        serializer = self.get_serializer(following, many=True)
        return Response(serializer.data)



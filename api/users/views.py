import logging
import os

from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


from users import serializers, models
from cards import models as cards_models
from .serializers import FollowerSerializer, UserSerializer

User = get_user_model()
logger = logging.getLogger(__name__)


class FollowUserView(viewsets.ViewSetMixin, generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    @action(methods=["PATCH"], detail=False)
    def preferences(self, pk=None):
        user = self.request.user
        preferences = self.request.data.get("preferences", [])
        user.preferences.clear()
        for name in preferences:
            tag, _ = cards_models.Tag.objects.get_or_create(name=name)
            user.preferences.add(tag)
        user.save()

        user.refresh_from_db()
        serializer = self.get_serializer(user)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(methods=['POST'], detail=True, serializer_class=FollowerSerializer, queryset=models.Follower.objects.all())
    def follow(self, request, pk=None):
        user_to_follow = get_object_or_404(User, pk=pk)

        if user_to_follow == self.request.user:
            return Response({"detail": "You can't follow yourself, duh..."}, status=status.HTTP_400_BAD_REQUEST)

        follow, created = models.Follower.objects.get_or_create(followed_user=user_to_follow, follower=self.request.user)

        if created:
            return Response({"detail": f"You are now following {user_to_follow.email}."},
                            status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": f"You are already following {user_to_follow.email}."},
                            status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=True, serializer_class=FollowerSerializer, queryset=models.Follower.objects.all())
    def unfollow(self, request, pk=None):
        user_to_unfollow = get_object_or_404(User, pk=pk)

        follow_instance = self.get_queryset().filter(follower=request.user, followed_user=user_to_unfollow)

        if follow_instance.exists():
            follow_instance.delete()
            return Response({"detail": f"You have unfollowed {user_to_unfollow.username}."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": f"You are not following {user_to_unfollow.username}."},
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], serializer_class=FollowerSerializer, queryset=models.Follower.objects.all())
    def followers(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        followers = user.followers.select_related("follower").all()
        followers = [follower.follower for follower in followers]
        serializer = UserSerializer(followers, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], serializer_class=FollowerSerializer, queryset=models.Follower.objects.all())
    def following(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        following = user.followed_users.select_related("followed_user").all()
        following = [followed.followed_user for followed in following]
        serializer = self.get_serializer(following, many=True)
        return Response(serializer.data)


# class AutoLoginPredefinedUserView(APIView):
#     """
#     A view that automatically logs in a predefined user
#     without requiring authentication.
#     """
#     http_method_names = ['post']
#     permission_classes = [AllowAny]
#
#     @staticmethod
#     def get_predefined_user():
#         email = os.environ.get("DEMO_USER_EMAIL")
#         password = os.environ.get("DEMO_USER_PASSWORD")
#         user, created = User.objects.get_or_create(email=email)
#         if created:
#             user.set_password(password)
#             user.save()
#
#         return user
#
#     def post(self, request, *args, **kwargs):
#         user = self.get_predefined_user()
#         refresh = RefreshToken.for_user(user)
#
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }, status=status.HTTP_200_OK)

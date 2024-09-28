from django.urls import path
from rest_framework import routers
from rest_framework.routers import SimpleRouter

from . import views

app_name = 'users'

router = routers.SimpleRouter()

router.register(r'users', views.FollowUserView, basename='users')

urlpatterns = router.urls

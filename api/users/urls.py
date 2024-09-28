from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

app_name = "users"

router = SimpleRouter()

router.register(r"users", views.FollowUserView, basename="users")

urlpatterns = [
    path("/token/demo", views.AutoLoginPredefinedUserView.as_view(), name="token-demo"),
]
urlpatterns += router.urls

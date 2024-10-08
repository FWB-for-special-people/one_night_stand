from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cards import views

app_name = 'cards'
router = DefaultRouter()
router.register(r"(?P<card_id>\d+)/comments", views.CommentViewSet, basename="comments")
router.register(r"", views.CardViewSet, basename="cards")
router.register(r"images", views.CardImageViewSet, basename="images")

urlpatterns = [
    path("", include(router.urls)),
    path("tags/", views.TagsView.as_view(), name="tags")
]

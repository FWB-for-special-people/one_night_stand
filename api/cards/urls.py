from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cards import views

app_name = 'cards'
router = DefaultRouter()
router.register(r"(?P<card_id>\d+)/comments", views.CommentViewSet, basename="comments")
router.register(r"", views.CardViewSet, basename="cards")

urlpatterns = [
    path("", include(router.urls)),
    path("model/", views.DataView.as_view(), name='model'),
    path("collab/", views.CardRecommendationView.as_view(), name='collab')
]

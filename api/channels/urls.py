from rest_framework.routers import SimpleRouter

from channels import views

router = SimpleRouter()
router.register(r"", views.ChannelViewSet, basename="channels")

urlpatterns = router.urls
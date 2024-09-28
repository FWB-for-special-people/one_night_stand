from django.contrib.auth import get_user_model
from django.db import models

from cards.models import Card

User = get_user_model()

class Channel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=1000, default="")
    members = models.ManyToManyField(User, related_name="channels")

    cards = models.ManyToManyField("cards.Card", related_name="channels")

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models

User = get_user_model()

class Card(models.Model):
    text = models.TextField(max_length=500)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    liked_by = models.ManyToManyField(User, related_name="liked_cards", through="CardLike")
    viewed_by = models.ManyToManyField(User, related_name="viewed_cards", through="CardView")
    tags = ArrayField(models.CharField(max_length=255), default=list, size=5)

    def __str__(self):
        return self.text[0:50]


class CardLike(models.Model):
    liked_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return f"{self.card} - {self.user} - {self.liked_at}"


class CardView(models.Model):
    viewed_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="views")
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="views")

    def __str__(self):
        return f"{self.card} - {self.user} - {self.viewed_at}"


class Comment(models.Model):
    text = models.TextField(max_length=500)

    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name="comments")

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.card}-{self.text:30}"

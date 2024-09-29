import random

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import ManyToManyField

User = get_user_model()


class Card(models.Model):
    text = models.TextField(max_length=500)
    difficulty = models.TextField(max_length=15)
    expected_time = models.PositiveSmallIntegerField(default=0)

    image = models.ForeignKey("cards.CardImage", on_delete=models.CASCADE)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    liked_by = models.ManyToManyField(User, related_name="liked_cards", through="CardLike")
    viewed_by = models.ManyToManyField(User, related_name="viewed_cards", through="CardView")
    tags = ManyToManyField("Tag", related_name="cards")

    def __str__(self):
        return self.text[0:50]


class CardImage(models.Model):
    image = models.ImageField(upload_to='cards/', null=True)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    is_public = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.image.name} - {self.is_public}"


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
    is_positive = models.FloatField(default=0.0)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.card}-{self.text:30}"

    def save(self, *args, **kwargs):
        if self.pk is None:
            rand_value = random.random()

            if rand_value <= 0.2:
                self.is_positive = random.uniform(-1, -0.8)
            elif rand_value <= 0.5:
                self.is_positive = random.uniform(-0.1, 0.1)
            else:
                self.is_positive = random.uniform(0.8, 1.0)

        super().save(*args, **kwargs)


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

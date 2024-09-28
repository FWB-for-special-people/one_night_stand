from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """

    The CustomUser class represents a custom user model that extends the AbstractUser model provided by Django.

    Attributes:
        - email (EmailField): The unique email address of the user.
        - first_name (CharField): The first name of the user.
        - last_name (CharField): The last name of the user.
        - is_active (BooleanField): Indicates whether the user's account is active or not.
        - bio (TextField): The optional description of the user.
        - avatar (FileField): The optional avatar image of the user.

    Attributes (inherited from AbstractUser):
        - username (CharField): The username of the user.

    Attributes:
        - USERNAME_FIELD (str): The field name used as the unique identifier of the user (set to "email").
        - REQUIRED_FIELDS (list[str]): The list of fields other than the password required when creating a user.

    Methods:
        - save(*args, **kwargs): Overrides the save method to set the username equal to the email if the user is being created.
        - __str__(): Returns a string representation of the user in the format "{email} {first_name} {last_name}".
        - score(): Calculates and returns the total score of the user based on the sum of all score changes.

    """

    email = models.EmailField(unique=True, verbose_name="Adres email")
    first_name = models.CharField(max_length=150, null=True, verbose_name="Imię")
    last_name = models.CharField(max_length=150, null=True, verbose_name="Nazwisko")
    bio = models.TextField(null=True, blank=True, verbose_name="Opis użytkownika")
    avatar = models.FileField(upload_to="avatars", null=True, blank=True, verbose_name="Avatar")

    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: list[str] = ["first_name", "last_name"]

    def save(self, *args, **kwargs):
        if not self.pk:
            self.username = self.email

        elif self.email != self.username:
            self.username = self.email

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} {self.first_name} {self.last_name}"


class Follower(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="followed_users")
    followed_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="followers")
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("follower", "followed_user")

    def __str__(self):
        return f"User {self.followed_user.email} followed by {self.follower.email} {self.followed_at}"

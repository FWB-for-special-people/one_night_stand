# Generated by Django 5.0.9 on 2024-09-28 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_follower"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="follower",
            unique_together={("follower", "followed_user")},
        ),
    ]

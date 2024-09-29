# Generated by Django 5.0.9 on 2024-09-28 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0004_card_difficulty_card_expected_time"),
        ("users", "0004_alter_follower_unique_together"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="preferences",
            field=models.ManyToManyField(
                blank=True, to="cards.tag", verbose_name="Upodobania"
            ),
        ),
    ]
# Generated by Django 5.0.9 on 2024-09-28 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="comment",
            name="is_positive",
            field=models.FloatField(default=0.0),
        ),
    ]
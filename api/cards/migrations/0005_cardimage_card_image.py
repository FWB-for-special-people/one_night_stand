# Generated by Django 5.0.9 on 2024-09-29 01:33
from pathlib import Path

import django.db.models.deletion
from django.conf import settings
from django.core.files import File
from django.db import migrations, models


def add_default_image(apps, _):
    CardImage = apps.get_model('cards', 'CardImage')
    User = apps.get_model(settings.AUTH_USER_MODEL)
    Card = apps.get_model('cards', 'Card')

    user = User.objects.first()

    image_path = Path(settings.BASE_DIR) / "assets" / "universal_bg_20240929T012848082.jpg"
    with open(image_path, "rb") as file:
        card_image = CardImage(created_by=user, is_public=True)
        card_image.image.save(image_path.stem, File(file), save=True)

    Card.objects.filter(image__isnull=True).update(image=card_image)


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0004_card_difficulty_card_expected_time"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="CardImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(null=True, upload_to="cards/")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_public", models.BooleanField(default=False)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="card",
            name="image",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="cards.cardimage",
                null=True,
                blank=True,
            ),
            preserve_default=False,
        ),
        migrations.RunPython(add_default_image, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="card",
            name="image",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="cards.cardimage",
                null=False,
                blank=False,
            ),
        )
    ]

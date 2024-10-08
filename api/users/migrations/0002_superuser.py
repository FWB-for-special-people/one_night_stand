# Generated by Django 5.1.1 on 2024-09-28 14:00
import os

from django.db import migrations
def create_superuser(apps, schema_editor):
    """Function for creating superuser using users.models.CustomUser
    Uses data from environmental variables that have to be set before starting the project.

    :param django.db.migrations.state.Apps apps: apps
    :param django.db.backends.postgresql.schema.BaseDatabaseSchemaEditor schema_editor: schema editor
    :return: None

    """
    User = apps.get_model("users", "CustomUser")

    DJ_SU_NAME = os.environ.get("DJ_SU_NAME")
    DJ_SU_EMAIL = os.environ.get("DJ_SU_EMAIL")
    DJ_SU_PASSWORD = os.environ.get("DJ_SU_PASSWORD")

    User.objects.create_superuser(email=DJ_SU_EMAIL, username=DJ_SU_NAME, password=DJ_SU_PASSWORD)


def delete_superuser(apps, schema_editor):
    """Function for deleting superuser using users.models.CustomUser
     Uses data from environmental variables that have to be set before starting the project.

    :param django.db.migrations.state.Apps apps: apps
    :param django.db.backends.postgresql.schema.BaseDatabaseSchemaEditor schema_editor: schema editor
    :return: None
    :raise IndexError: if user with email given in environmental variables is not found

    """
    User = apps.get_model("users", "CustomUser")
    admin = User.objects.get(email=os.environ.get("DJ_SU_EMAIL"))
    if admin.is_superuser:
        admin.delete()
    else:
        raise IndexError("User with id = 1 is not an admin.")


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [migrations.RunPython(create_superuser, delete_superuser)]

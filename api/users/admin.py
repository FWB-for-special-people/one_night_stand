from django.contrib import admin

from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


CustomUser = get_user_model()


class CustomUserAdminConfig(UserAdmin):
    list_display = ("email", "first_name", "last_name", "is_active", "is_staff", "last_login")
    search_fields = ("first_name", "last_name", "email")
    list_filter = ("is_active", "is_staff", "last_login")
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("bio", "avatar")}),)


admin.site.register(CustomUser, CustomUserAdminConfig)


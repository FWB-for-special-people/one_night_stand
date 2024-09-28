from django.contrib import admin
from . import models

admin.site.register(models.Card)
admin.site.register(models.CardLike)
admin.site.register(models.CardView)
admin.site.register(models.Comment)

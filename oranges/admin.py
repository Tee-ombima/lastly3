from django.contrib import admin
from .models import Orange

# Register your models here.

# overiding defaults
admin.site.site_header = "Oranges trace admin"
admin.site.site_title = "Oranges trace admin area"
admin.site.index_title = "Welcome to oranges trace admin area"


# orange admin
class VehicleAdmin(admin.ModelAdmin):
    model = Orange
    extra = 3


admin.site.register(Orange, VehicleAdmin)

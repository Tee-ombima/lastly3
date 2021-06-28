from django.contrib import admin
from .models import OrangeFarmer
# Register your models here.


# register the model
class CarOwnerAdmin(admin.ModelAdmin):
    model = OrangeFarmer
    extra = 3


admin.site.register(OrangeFarmer, CarOwnerAdmin)

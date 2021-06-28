from django.urls import path
from . import views

app_name = "oranges"

urlpatterns = [
    path('add-orange', views.handleAddVehicle, name="add-orange"),
    path('delete-orange', views.deleteVehicle, name="delete-orange"),
    path('update-hired-status', views.updateHiredStatus, name="update-hired-status")
]

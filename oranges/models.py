from django.db import models
from orangeFarmers.models import OrangeFarmer
from uuid import uuid4
# Create your models here.


def vehicle_path(instance, filename):
    extname = filename.split('.')[-1]
    if instance.pk:
        filename = f"{instance.pk}.{extname}"
    else:
        filename = f"{uuid4().hex}.{extname}"
    return f"images/oranges/{filename}"


class Orange(models.Model):
    owner = models.ForeignKey(OrangeFarmer, on_delete=models.CASCADE)
    #hired = models.BooleanField(default=False)
    type = models.CharField(max_length=200)
    price = models.CharField(max_length=200)
    maturity_date = models.CharField(max_length=200)
    model = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    foreground_image = models.ImageField(
        upload_to=vehicle_path, null=False, blank=False)
    inside_image = models.ImageField(
        upload_to=vehicle_path, null=False, blank=False)
    background_image = models.ImageField(
        upload_to=vehicle_path, null=False, blank=False)
    supplier = models.CharField(max_length=100)
    supplier_location = models.CharField(max_length=100)
    grafted = models.CharField(default="petrol", max_length=100)
    reported_cases = models.IntegerField(default=4)

    def __str__(self):
        return f"{self.owner.name},{self.type},{self.model}"

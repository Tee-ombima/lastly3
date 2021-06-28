from django.db import models
from uuid import uuid4
# Create your models here.


def profile_path(instance, filename):
    extname = filename.split('.')[-1]
    # get the filename
    if instance.pk:
        filename = f"{instance.pk}.{extname}"
    else:
        filename = f"{uuid4().hex}.{extname}"
    return f"images/profiles/{filename}"


class OrangeFarmer(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    profile_picture = models.ImageField(
        upload_to=profile_path, null=False, blank=False)
    password = models.CharField(max_length=300)

    def __str__(self):
        return self.name

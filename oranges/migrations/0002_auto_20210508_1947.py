# Generated by Django 3.2.2 on 2021-05-08 19:47

from django.db import migrations, models
import django.utils.timezone
import oranges.models


class Migration(migrations.Migration):

    dependencies = [
        ('oranges', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orange',
            name='background_image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=oranges.models.vehicle_path),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orange',
            name='foreground_image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=oranges.models.vehicle_path),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='orange',
            name='inside_image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=oranges.models.vehicle_path),
            preserve_default=False,
        ),
    ]
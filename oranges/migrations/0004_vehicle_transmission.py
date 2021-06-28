# Generated by Django 3.2.2 on 2021-05-09 10:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('oranges', '0003_vehicle_engine_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='orange',
            name='supplier_location',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]

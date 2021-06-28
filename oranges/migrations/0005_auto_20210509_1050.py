# Generated by Django 3.2.2 on 2021-05-09 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oranges', '0004_vehicle_transmission'),
    ]

    operations = [
        migrations.AddField(
            model_name='orange',
            name='grafted',
            field=models.CharField(default='petrol', max_length=100),
        ),
        migrations.AddField(
            model_name='orange',
            name='reported_cases',
            field=models.IntegerField(default=4),
        ),
    ]

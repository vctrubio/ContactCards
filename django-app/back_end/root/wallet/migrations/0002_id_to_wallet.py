# Generated by Django 5.1 on 2024-09-08 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

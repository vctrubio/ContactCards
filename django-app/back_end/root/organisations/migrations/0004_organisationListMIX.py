# Generated by Django 5.1 on 2024-08-29 12:51

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisations', '0003_organisationList'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OrganisationsLink',
            new_name='OrganisationsList',
        ),
    ]

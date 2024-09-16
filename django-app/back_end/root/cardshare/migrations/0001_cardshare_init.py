# Generated by Django 5.1 on 2024-09-16 13:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('card', '0002_cardshare_init'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CardShare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction', models.DateTimeField(auto_now_add=True)),
                ('card_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='card.card')),
                ('shared_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET, related_name='shared_by_cardshares', to=settings.AUTH_USER_MODEL)),
                ('shared_prev', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET, to='cardshare.cardshare')),
                ('shared_with', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shared_with_cardshares', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

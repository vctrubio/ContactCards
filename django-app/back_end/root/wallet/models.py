from django.db import models
from organisations.models import Organisation


class Wallet(models.Model):
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    organisations = models.ManyToManyField(Organisation, related_name="wallets")


def __str__(self):
    return f"{self.user.username} Wallet"

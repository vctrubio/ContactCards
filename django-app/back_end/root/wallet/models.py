from django.db import models
from organisations.models import Organisation


class Wallet(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitly define the id field
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    organisations = models.ManyToManyField(Organisation, related_name="wallets")

    def __str__(self):
        organisations_list = [
            # f"{org.id}: {org.name}" for org in self.organisations.all()
            f"{org.name}" for org in self.organisations.all()
        ]
        organisations_str = ", ".join(organisations_list)
        return f"Wallet: {self.id}: {self.user.username}: Organisations: {organisations_str}"

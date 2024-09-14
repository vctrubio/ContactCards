from django.db import models
from card.models import Card


class Wallet(models.Model):
    id = models.AutoField(primary_key=True)  # Explicitly define the id field
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    cards = models.ManyToManyField(Card, related_name="wallets")

    def __str__(self):
        cards_list = [
            f"{card.id}" for card in self.cards.all()
        ]
        cards_str = ", ".join(cards_list)
        return f"Wallet: {self.id}: {self.user.username}: Cards: {cards_str}"


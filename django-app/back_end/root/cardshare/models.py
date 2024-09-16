from django.db import models
from django.contrib.auth.models import User
from django.db.models import SET
from card.models import Card

# Create your models here.

class CardShare(models.Model):
    card_id = models.ForeignKey(Card, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(User, on_delete=SET, to_field='id', null=True, blank=True, related_name='shared_by_cardshares')
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_with_cardshares')   
    transaction = models.DateTimeField(auto_now_add=True)
    shared_prev = models.ForeignKey('self', on_delete=SET, to_field='id', null=True, blank=True)
    def __str__(self):
        return f"Card {self.card.id} shared by {self.shared_by.username if self.shared_by else 'N/A'} with {self.shared_with.username if self.shared_with else 'N/A'}"
    

''' in dev '''
def get_full_sharing_chain(card_share):
    chain = []
    current_share = card_share
    while current_share:
        chain.append(current_share)
        current_share = current_share.shared_prev
    return chain
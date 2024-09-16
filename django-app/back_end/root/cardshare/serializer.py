from rest_framework import serializers
from .models import CardShare
from wallet.models import Wallet


##** validate if card is in shared_with wallet, validate if its shared by same user or not ... if so do what extactly?
class CardShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardShare
        fields = ['id', 'card_id', 'shared_by', 'shared_with', 'transaction', 'shared_prev']
        read_only_fields = ['transaction', 'shared_prev']

    def create(self, validated_data):
        shared_with = validated_data.get('shared_with')
        card = validated_data['card_id']

        wallet, rtn_bool_if_created = Wallet.objects.get_or_create(user=shared_with)
       
        if rtn_bool_if_created:
           print(f'Wallet created for {shared_with.username}')
        
        try:
            wallet.cards.add(card)
        except Exception as e:
            print(f'Card {card} to wallet {wallet}: {e}') 
            
        return super().create(validated_data)

    """
    class CardShare(models.Model):
    card_id = models.ForeignKey(Card, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(User, on_delete=SET, to_field='id', null=True, blank=True, related_name='shared_by_cardshares')
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_with_cardshares')   
    transaction = models.DateTimeField(auto_now_add=True)
    shared_prev = models.ForeignKey('self', on_delete=SET, to_field='id', null=True, blank=True)
    def __str__(self):
        return f"Card {self.card.id} shared by {self.shared_by.username if self.shared_by else 'N/A'} with {self.shared_with.username if self.shared_with else 'N/A'}"
    """

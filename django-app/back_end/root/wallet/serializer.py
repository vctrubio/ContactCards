from rest_framework import serializers
from .models import Wallet
from card.serializer import CardSerializer, NestedCardSerializer

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'
        
       
class NestedUserWalletSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        exclude = ['user']  # Exclude 'user' field
 

# check user does not have wallet... | if user has wallet, append list of cards to wallet, duplicates = continue
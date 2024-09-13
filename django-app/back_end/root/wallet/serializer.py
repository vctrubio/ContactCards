from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'
        
       
class NestedUserWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        exclude = ['user']  # Exclude 'user' field
 

# check user does not have wallet... | if user has wallet, append list of cards to wallet, duplicates = continue
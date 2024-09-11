from rest_framework import serializers
from .models import Card, CardShare

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
        
class CardShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardShare
        fields = '__all__'
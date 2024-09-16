   
from rest_framework import serializers
from .models import CardShare

class CardShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardShare
        fields = '__all__'
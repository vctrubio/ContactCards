from rest_framework import serializers
from .models import Card, CardShare

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
    
    def validate(self, data):
        organisation = data.get('organisation')
        employee = data.get('employee')
        
        # if organisation is None or employee is None:
        #     raise serializers.ValidationError("Employee | Organisation is required.")
        
        if organisation and employee:
            if Card.objects.filter(organisation=organisation, employee=employee).exists():
                raise serializers.ValidationError("This organisation already has a card for this employee.")
        
        return data

class NestedCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        exclude = ['organisation']  # Exclude 'organisation' field
        
class CardShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardShare
        fields = '__all__'
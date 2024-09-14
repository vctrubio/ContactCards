from rest_framework import serializers
from .models import Card, CardShare

class CardSerializer(serializers.ModelSerializer):
    organisation = serializers.SerializerMethodField()
    employee = serializers.StringRelatedField()
    class Meta:
        model = Card
        fields = '__all__'    


    def get_organisation(self, obj):
        from organisations.serializer import NestedOrganisationSerializer
        return NestedOrganisationSerializer(obj.organisation).data if obj.organisation else None


    def validate(self, data):
        organisation = data.get('organisation')
        employee = data.get('employee')
        
        if organisation and employee:
            if Card.objects.filter(organisation=organisation, employee=employee).exists():
                raise serializers.ValidationError("This organisation already has a card for this employee.")
        
        return data




class NestedCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        exclude = ['organisation']
        
        
        
        
        
        
        
        
        
        
        
        
        
        
class CardShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardShare
        fields = '__all__'
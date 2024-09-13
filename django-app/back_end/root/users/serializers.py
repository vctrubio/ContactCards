from rest_framework import serializers
from django.contrib.auth.models import User
from organisations.serializer import Organisation, OrganisationSerializer
from card.serializer import CardSerializer

class UserSerializer(serializers.ModelSerializer):
    organisations = serializers.SerializerMethodField()    
    class Meta:
        model = User
        fields = '__all__'
        
    def get_organisations(self, obj):
        organisations = Organisation.objects.filter(owner=obj.id)
        return OrganisationSerializer(organisations, many=True).data

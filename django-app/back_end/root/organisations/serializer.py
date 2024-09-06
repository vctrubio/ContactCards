from rest_framework import serializers
from .models import Organisation, OrganisationsList
#How to change incoming data 


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = '__all__'

class OrganisationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganisationsList
        fields = '__all__'
        
    
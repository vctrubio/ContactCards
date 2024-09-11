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
        
''' 
# Example usage of the serializer
# Create an instance of the serializer with data from a request
serializer = MyModelSerializer(data=request.data)

# Check if the data is valid according to the serializer rules
if serializer.is_valid():
    # If valid, save the data (create or update the model instance)
    serializer.save()
else:
    # If not valid, print the validation errors
    print(serializer.errors)
'''
from rest_framework import serializers
from .models import Organisation
from card.serializer import CardSerializer

class OrganisationSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True, source='card_set')
    employees = serializers.SerializerMethodField()
    class Meta:
        model = Organisation
        fields = '__all__'
        
    def get_employees(self, obj):
        employees = set()
        for card in obj.card_set.all():
            employees.add(card.employee.username)
        return list(employees)

class NestedOrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = [
            'id',
            'name'
        ]


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
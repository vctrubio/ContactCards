from rest_framework import serializers
from django.contrib.auth.models import User
from organisations.serializer import Organisation, OrganisationSerializer, NestedOrganisationSerializer
from wallet.serializer import NestedUserWalletSerializer
from django.core.exceptions import ObjectDoesNotExist

class UserSerializer(serializers.ModelSerializer):
    organisations = serializers.SerializerMethodField()
    wallet = serializers.SerializerMethodField()
    employee_organisations = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            "id",
            "is_active",
            "is_staff",
            "username",
            "email",
            "wallet",
            "organisations",
            "employee_organisations",
        ]

    def get_organisations(self, obj):
        organisations = Organisation.objects.filter(owner=obj.id)
        return OrganisationSerializer(organisations, many=True).data


    def get_wallet(self, obj):
        try:
            return NestedUserWalletSerializer(obj.wallet).data
        except ObjectDoesNotExist:
            return None
    
    def get_employee_organisations(self, obj):
        organisations = Organisation.objects.filter(card__employee=obj).distinct()
        return NestedOrganisationSerializer(organisations, many=True).data
from rest_framework import serializers
from django.contrib.auth.models import User
from organisations.serializer import Organisation, OrganisationSerializer
from wallet.serializer import NestedUserWalletSerializer


class UserSerializer(serializers.ModelSerializer):
    organisations = serializers.SerializerMethodField()
    wallet = serializers.SerializerMethodField()

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
        ]

    def get_organisations(self, obj):
        organisations = Organisation.objects.filter(owner=obj.id)
        return OrganisationSerializer(organisations, many=True).data

    def get_wallet(self, obj):
        return NestedUserWalletSerializer(obj.wallet).data
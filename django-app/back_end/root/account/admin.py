from django.contrib import admin
from organisations.models import Organisation, OrganisationsList

# Register your models here.
admin.site.register(Organisation)
admin.site.register(OrganisationsList)

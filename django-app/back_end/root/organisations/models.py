from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Organisation(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organisations')
    about = models.CharField(max_length=256)
    www = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Name: {self.name}, Owner: {self.owner}, About: {self.about}, www: {self.www}, Location: {self.location}'
    
    ##TO ADD employees

class OrganisationsList(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organisations_links')
    organisations = models.ManyToManyField(Organisation, related_name='organisations_links', blank=True)
    is_public = models.BooleanField(default=True)
    
    def __str__(self):
        return f'Name: {self.name}, Owner: {self.owner}, Organisations: {self.organisations}, is_public: {self.is_public}'
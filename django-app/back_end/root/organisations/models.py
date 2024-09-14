import os
from django.contrib.auth.models import User
from django.db import models

def organisation_pp_upload_to(instance, filename):
    # Generate the upload path dynamically based on the organization's ID
    return os.path.join('organisations', 'pp', str(instance.id), filename)

class Organisation(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organisations')
    about = models.CharField(max_length=256)
    www = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    pp = models.ImageField(upload_to=organisation_pp_upload_to, null=True, blank=True) #default='organisations/pp/default.jpg')
    
    def __str__(self):
        return f'Name: {self.name}, Owner: {self.owner}, About: {self.about}, www: {self.www}, Location: {self.location}'
    

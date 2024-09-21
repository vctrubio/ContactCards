from django.db import models
from django.db.models.deletion import SET
from organisations.models import Organisation
from django.contrib.auth.models import User

class Card(models.Model):
    id = models.AutoField(primary_key=True)
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, null=True)
    
    # def get_card_shares(self):
    #     shares = CardShare.objects.filter(card_id=self.id).order_by('transaction') # to be imporved... linked list todo
    #     return shares
    
    def __str__(self):
        return f"Card {self.id} from {self.organisation.name} for {self.employee.username}"



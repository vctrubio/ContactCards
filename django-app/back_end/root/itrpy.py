import os
import requests

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'root.settings')

import django
django.setup()

from organisations.models import Organisation, OrganisationsList
from wallet.models import Wallet
from card.models import Card
from django.contrib.auth.models import User
from dotenv import load_dotenv

load_dotenv()

# current_directory = os.getcwd()
# print("Current Working Directory:", current_directory)

organisations = Organisation.objects.all()
ll = OrganisationsList.objects.all()
users = User.objects.all()
usernames = [user.username for user in users]
admin = User.objects.get(username='admin')
wallets = Wallet.objects.all()
cards = Card.objects.all()



# new_organisation = Organisation(
#     name="New Organisation",
#     owner=admin,
#     about="This is a new organisation.",
#     www="www.neworg.com",
#     location="123 Main St"
# )
# new_organisation.save()

# print(f'''{usernames}''')
# print(f'{organisations=}')


#python3 -i  itrpy.py



def api_call_stores():
    print("API Call Stores")

    query = 'stores'
    api_key = os.getenv('API_KEY_GOOGLE_CONSOLE')
    location = "36.0136,-5.6078"  # Latitude,Longitude for Tarifa
    radius = 10000  # Radius in meters (adjust as needed)

    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&location={location}&radius={radius}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    print(data)

    for place in data['results']:
        name = place['name']
        address = place['formatted_address'].split(",")[0]
        # print(f'''{place=}''')
        # print(f'''{name=}, {address=}''')
        Organisation(
            name=name,
            owner=admin,
            about="Google Parse API... No hay mucho que decir.",
            www=f'www.{name}.com',
            location=address
        ).save()
        
        
# api_call_stores()


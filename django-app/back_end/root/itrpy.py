import os
import requests
import random
# python3 -i  itrpy.py

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "root.settings")

import django

django.setup()

from organisations.models import Organisation
from wallet.models import Wallet
from card.models import Card
from django.contrib.auth.models import User
from dotenv import load_dotenv

load_dotenv()

# current_directory = os.getcwd()
# print("Current Working Directory:", current_directory)

organisations = Organisation.objects.all()
users = User.objects.all()
usernames = [user.username for user in users]
admin = User.objects.get(username="admin")
wallets = Wallet.objects.all()
cards = Card.objects.all()


def create_users():
    users_data = [
        ("JuanMachado", "Juan", "Machado"),
        ("JosePepeball", "Jose", "Pepeball"),
        ("JuanitoMaravillas", "Juanito", "Maravillas"),
        ("DonPatigo", "Don", "Patigo"),
        ("HuevoDuro", "Huevo", "Duro"),
    ]
    for username, first_name, last_name in users_data:
        user = User.objects.create_user(
            username=username,
            email=f'{username.lower()}@gmail.com',
            password='password',
            first_name=first_name,
            last_name=last_name
        )
        user.save()
    print("Users Created GOOD")
    
def create_cards():
    cards_data = [
        (1, [2, 3]),  # (organisation_id, [user_id1, user_id2, ...])
        (2, [3, 4]),
        (3, [5]),
        (4, [3, 2]),
        (5, [2, 4, 5]),
        (6, [3, 5]),
        (7, [2, 3, 4]),
        (8, [1]),
    ]
    
    
    for organisation_id, user_ids in cards_data:
        organisation = Organisation.objects.get(id=organisation_id)
        for user_id in user_ids:
            user = User.objects.get(id=user_id)
            card = Card.objects.create(
                employee=user,
                organisation=organisation
            )
            card.save()
    print("Cards Created GOOD")

def api_call_stores():
    print("API Call Stores")

    query = "stores"
    api_key = os.getenv("API_KEY_GOOGLE_CONSOLE")
    location = "36.0136,-5.6078"  # Latitude,Longitude for Tarifa
    radius = 10000

    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&location={location}&radius={radius}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    users_ptr = User.objects.filter(is_superuser=False)


    for place in data["results"]:
        name = place["name"]
        address = place["formatted_address"].split(",")[0]
        Organisation(
            name=name,
            owner=random.choice(users_ptr),
            about="Google Parse API... No hay mucho que decir.",
            www=f"www.{name}.com",
            location=address,
        ).save()
    print("Stores Created GOOD")


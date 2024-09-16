from django.urls import path
from .views import card_list, card_pk

urlpatterns = [
    path('', card_list, name='card_list'),
    path('<int:pk>/', card_pk, name='card_pk'),
]
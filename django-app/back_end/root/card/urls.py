from django.urls import path
from .views import card_list, card_pk, card_share_list

urlpatterns = [
    path('', card_list, name='card_list'),
    path('<int:pk>/', card_pk, name='card_pk'),
    path('share/', card_share_list, name='card_share_list')
]
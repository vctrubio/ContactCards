from django.urls import path
from .views import wallet_list, wallet_pk

# its already /models
urlpatterns = [
    path('', wallet_list ),
    path('<int:pk>/', wallet_pk),
]
from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_list, name='users'),
    path('auth/', views.user_auth, name='user_auth'),
]

"""
URL configuration for root project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('organisations/', include('organisations.urls')),
    path('users/', include('users.urls')),
    path('login/', views.login_view, name='login'),
    path('account/', include('account.urls'), name='account'),
    path('wallets/', include ('wallet.urls'), name='wallet'),
    path('cards/', include ('card.urls'), name='card'),
    path('trans/', include ('cardshare.urls'), name='card'),

]

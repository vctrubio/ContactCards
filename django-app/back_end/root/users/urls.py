from django.urls import path
from . import views

urlpatterns = [
    path("", views.user_list, name="users"),
    path("<int:user_id>/", views.user_detail, name="user_detail"),
    path("<str:username>/", views.user_by_username, name="user_detail_by_username"),
]

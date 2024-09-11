from django.urls import path
# from server.root.root.urls import urlpatterns
from .views import organisation_detail, organisation_list, OrgyList

urlpatterns = [
    path('', organisation_list),
    path('<int:pk>/', organisation_detail, name='organisation_detail'),
]

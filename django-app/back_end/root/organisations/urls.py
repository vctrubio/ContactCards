from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
# from server.root.root.urls import urlpatterns
from .views import organisation_detail, organisation_list

urlpatterns = [
    path('', organisation_list),
    path('<int:pk>/', organisation_detail, name='organisation_detail'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
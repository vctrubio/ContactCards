from django.urls import path
from . import views


urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("status/", views.user_status, name="user_status"),
    path("login/", views.login_me, name="login"),
    path("logout/", views.logout_me, name="logout"),
    path("register/", views.register, name="register"),
    path("token/", views.token_g, name="token_obtain_pair"),
    path("token/refresh/", views.token_r, name="token_refresh"),
    path("test/", views.Test.as_view(), name="test"),
    path("user/", views.get_user, name="user"),
    path("user/<str:user_username>/", views.get_user_by_id, name="user_by_id"),
]


"""
With JWT Authentication:
If you’re using JWT tokens for authentication (which is what you’re setting up for API-based login):

Logging out typically involves removing the JWT token on the client-side (e.g., clearing it from localStorage or cookies in your Next.js app).
There isn't a server-side "logout" per se because JWT tokens are stateless and don't rely on sessions.

Token Verification:

When the client sends a request with an Authorization header containing the JWT token (e.g., Bearer <access_token>),
Django REST Framework’s SimpleJWT authentication classes will automatically decode and verify the token to authenticate the user.

"""

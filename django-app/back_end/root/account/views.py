from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from users.serializers import UserSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

""" ON THE BACK END FIRST

-- Only sending minimal: Error: Network response was not ok
   Needs to send user not correct of password not correct...
"""


def homepage(request):
    print("User status request user10:", request.user)
    if request.user.is_authenticated:
        return HttpResponse(f"Hello {request.user.username}")
    else:
        return HttpResponse("User not found")


def user_status(request):
    print("User status request user22222222:", request.user)
    if request.user.is_authenticated:
        return JsonResponse(
            {
                "statusCheck": True,
                "username": request.user.username,
                "id": request.user.id,
            }
        )
    else:
        return JsonResponse({"statusCheck": False})


@api_view(["GET"])
def auth(request):
    print("User status request usercheck1234:", request.user)

    if request.user.is_authenticated:
        return Response(True)
    else:
        return Response(False)


def get_user_by_id(request, user_username):
    try:
        user = User.objects.get(username=user_username)
    except User.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)

    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_user(request):
    try:
        if request.user.is_authenticated:
            user = User.objects.get(username=request.user.username)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        else:
            return Response({"message": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(f"An error occurred in get_user: {e}")
        return JsonResponse(
            {"message": "An error occurred in exception", "error": str(e)}, status=500
        )


@api_view(["GET", "POST"])
def login_me(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {
                    "message": "User not found. Please check your username and try again."
                },
                status=404,
            )

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # This logs the user in via Django session

            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful!",
                    "token": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": UserSerializer(user).data,
                }
            )

        else:
            return Response(
                {"message": "Incorrect password. Please try again."}, status=401
            )

    return Response({"message": "Unsupported method"}, status=405)


def logout_me(request):
    if request.user.is_anonymous:
        return Response({"message": "User not logged in"}, status=401)
    logout(request)
    # return Response({"message": "Logged out successfully!"}, status=200)
    return HttpResponseRedirect(reverse("homepage"))


@api_view(["POST"])
def register(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")

        if username and password:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "User created!",
                    "token": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": UserSerializer(user).data,
                },
                status=201,
            )

        else:
            return Response({"message": "Invalid credentials"}, status=400)


"""
This generates a token for the user:{} with the following POST request:
    -username
    -password
"""


def token_g(request):
    return TokenObtainPairView.as_view()(request)


def token_r(request):
    return TokenRefreshView.as_view()(request)

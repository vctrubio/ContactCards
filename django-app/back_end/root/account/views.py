from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from organisations.models import Organisation

# from card.models import Card
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from wallet.models import Wallet

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
            {"statusCheck": True, "username": request.user.username, "id": request.user.id}
        )
    else:
        return JsonResponse({"statusa": False})

@api_view(['GET'])
def auth(request):
    print('test879')
    print("User status request usercheck1234:", request.user)
    
    if request.user.is_authenticated:
        return Response(True)
    else:
        return Response(False)


def tmp_serialize_user_data(user):
    user_organisations = Organisation.objects.filter(owner=user)

    organisations_data = [
        {
            "id": org.id,
            "name": org.name,
            "about": org.about,
            "www": org.www,
            "location": org.location,
        }
        for org in user_organisations
    ]
    try:
        wallet_data = Wallet.objects.get(user=user)
        wallet = {
            "id": wallet_data.id,
            # "cards": [
            #     {"id": org.id, "name": org.name} for org in wallet_data.cards.all()
            # ],
        } ## Must be Jsonized
        
    except Wallet.DoesNotExist:
        wallet = None

    return organisations_data, wallet


def get_user_by_id(request, user_username):
    try:
        user = User.objects.get(username=user_username)
    except User.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)

    organisations_data, wallet = tmp_serialize_user_data(user)
    return JsonResponse(
        {
            "id": user.id,
            "username": user.username,
            "organisations": organisations_data,
            "wallet": wallet,
        }
    )


def get_user(request):
    try:
        # print("User get request user01:", request.user)
        # this is depreciated becasue now user returns everything on the backend.... 

        if request.user.is_authenticated:
            organisations_data, lists_data = tmp_serialize_user_data(request.user)

            return JsonResponse(
                {
                    "id": request.user.id,
                    "username": request.user.username,
                    "organisations": organisations_data,
                }
            )
            return 

        else:
            print(
                f"User is not authenticated. User: {request.user}, Authenticated: {request.user.is_authenticated}"
            )
            print(f"Session Key: {request.session.session_key}")
            print(f"Session Data: {dict(request.session.items())}")
            print(f"User ID: {request.user.id if request.user else 'No user'}")
            print(f"User is Anonymous: {request.user.is_anonymous}")
            return JsonResponse(
                {
                    "message": "User not found",
                    "Authenticated": request.user.is_authenticated,
                },
                status=404,
            )
    except Exception as e:
        print(f"An error occurred: {e}")
        return JsonResponse(
            {"message": "An error occurred", "error": str(e)}, status=500
        )


class Test(APIView):
    def get(self, request):
        content = {"message": "Hello, World!"}
        ptr_response = Response(content, status=200)
        ptr_response.set_cookie("test_cookie", "test_cookie_value")
        return ptr_response


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

            # return Response({'message': 'User created!'}, status=201)
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "User created!",
                    "token": str(refresh.access_token),
                    "refresh": str(refresh),
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

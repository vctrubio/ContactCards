from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from organisations.models import Organisation, OrganisationsList


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


""" ON THE BACK END FIRST
/ if user logged in, return welcome username, else return need to login with login url [X]
/login POST request to login
/logout POST request to logout [X]
/register POST request to register


-- Only sending minimal: Error: Network response was not ok
   Needs to send user not correct of password not correct...
"""


def homepage(request):
    print("User status request user:", request.user)
    if request.user.is_authenticated:
        return HttpResponse(f"Hello {request.user.username}")
    else:
        return HttpResponse("User not found")


def user_status(request):
    print("User status request user:", request.user)

    if request.user.is_authenticated:
        return JsonResponse(
            {"status": True, "username": request.user.username, "id": request.user.id}
        )
    else:
        return JsonResponse({"status": False})


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
    lists_data = [
        {
            "name": lst.name,
            "is_public": lst.is_public,
            "organisations": [org.name for org in lst.organisations.all()],
        }
        for lst in OrganisationsList.objects.filter(owner=user)
    ]

    return organisations_data, lists_data


def get_user_by_id(request, user_username):
    print(f'''I ceeeee{user_username=}''')
    
    try:
        user = User.objects.get(username=user_username)
    except User.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)

    organisations_data, lists_data = tmp_serialize_user_data(user)
    return JsonResponse(
        {
            "id": user.id,
            "username": user.username,
            "organisations": organisations_data,
            "lists": lists_data,
        }
    )


def get_user(request):
    print("User get request user:", request.user)

    if request.user.is_authenticated:
        organisations_data, lists_data = tmp_serialize_user_data(request.user)

        return JsonResponse(
            {
                "id": request.user.id,
                "username": request.user.username,
                "organisations": organisations_data,
                "lists": lists_data,
            }
        )
    else:
        return JsonResponse({"message": "User not found"}, status=404)


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

import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
import django.shortcuts
from rest_framework.decorators import api_view

@api_view(['POST', 'GET'])
def homepage(request):
    body = json.loads(request.body)
    if request.method == 'POST':
        username = body['username']
        password = body['password']

        # ptr = User.objects.filter(username=username).first()
        # if ptr is None:
        #     return JsonResponse({'message': 'User does not exist'}, status=404)
        # if not ptr.check_password(password):
        #     return JsonResponse({'message': 'Incorrect password'}, status=401)
        # else:
            # return JsonResponse({'message': 'Welcome to the homepage'}, status=200)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            return JsonResponse({'message': 'User exists'}, status=200)
        else:
            #return error message
            return JsonResponse({'message': 'User does not exist'})
        #create new user if user does not exist
        pass



    if request.method == 'GET':
        #if user matches with the database return true, else false
        pass

    return JsonResponse({'message': body})
    return JsonResponse({'message': 'Welcome to the homepage'})


from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(['GET'])
def user_list(request):
    data = User.objects.all()
    serializer = UserSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, user_id):
    try:
        data = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"status": False}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
def user_by_username(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"status": False}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(user)
    return Response(serializer.data)

    
@api_view(['POST', 'GET'])
def subscribe_user(request):
    print('django.....callling....alll.....babies')
    # return Response({"status": True}, status=status.HTTP_200_OK)
 
    def process_of_subscribing(user):
        user.is_staff = True
        user.save()
        return 
    
    if request.method == "GET":
        data = User.objects.filter(is_staff=True)
        users = UserSerializer(data, many=True)
        return Response({"users": users.data}, status=status.HTTP_200_OK)
    
    if request.method == "POST":
        user = request.user
        
        if user is None or not user.is_authenticated:
            return Response({"status": False}, status=status.HTTP_401_UNAUTHORIZED)

        if user.is_staff:
            return Response({"status": 'Already Subscribed'}, status=status.HTTP_409_CONFLICT)
        
        process_of_subscribing(user)
        return Response({"status": True}, status=status.HTTP_200_OK)


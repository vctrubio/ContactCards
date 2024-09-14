from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer 

@api_view(['GET'])
def user_list(request):
    data = User.objects.all()
    serializer = UserSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_auth(request):
    if request.user.is_authenticated:
        get_user = User.objects.get(username=request.user)
        return Response(UserSerializer(get_user).data, status=status.HTTP_200_OK)
    return Response({"status": False}, status=status.HTTP_401_UNAUTHORIZED)
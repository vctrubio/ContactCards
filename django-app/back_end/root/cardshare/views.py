from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User

from .models import CardShare
from .serializer import CardShareSerializer




@api_view(["POST"])
def transaction_employee_to_user(request):
    ##passing shard_with and card_id in request.data
    
    user = request.user
    if not user:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    if not user.is_authenticated:
        return Response(
            {"message": "User not authen"}, status=status.HTTP_404_NOT_FOUND
        )
        
    shared_with_username = request.data.get('shared_with')
    card_id = request.data.get('card_id')

    try:
        shared_with = User.objects.get(username=shared_with_username)
    except User.DoesNotExist:
        return Response({"message": "shared_with_username not found"}, status=status.HTTP_404_NOT_FOUND)
    
    print("🐍 File: cardshare/views.py | Line: 33 | transaction_employee_to_user ~ user",user)
    data = {
        'shared_by': user.id,
        'shared_with': shared_with.id,
        'card_id': card_id,
        'shared_prev': None 
    }
        
    serializer = CardShareSerializer(data=data)
    
    print("🐍 File: cardshare/views.py | Line: 22 | transaction_employee_to_user ~ serializer",serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "DELETE"])
def index(request):
    if request.method == "GET":
        data = CardShare.objects.all()
        serializer = CardShareSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
  
    elif request.method == "DELETE":
        count, _ = CardShare.objects.all().delete()
        if count == 0:
            return Response(
                {"message": "The database was empty"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"message": f"{count} CardShares deleted"}, status=status.HTTP_200_OK
        )

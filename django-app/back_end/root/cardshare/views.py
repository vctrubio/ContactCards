from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import CardShare
from .serializer import CardShareSerializer

@api_view(["GET"])
def index(request):
    cards = CardShare.objects.all()
    return Response({"message": "CardShare index"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def transaction_employee_to_user(request):
    user = request.user
    if not user:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    if not user.is_authenticated:
        return Response(
            {"message": "User not authen"}, status=status.HTTP_404_NOT_FOUND
        )
    if user.is_authenticated:
        return Response({"message": "User is authen"}, status=status.HTTP_200_OK)

    return Response({"message": "END OF FILE"}, status=status.HTTP_404_NOT_FOUND)


##
@api_view(["GET", "POST", "DELETE"])
def card_share_list(request):
    # return Response({'message': 'Card list'}, status=status.HTTP_200_OK)
    if request.method == "GET":
        data = CardShare.objects.all()
        serializer = CardShareSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = CardShareSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        count, _ = CardShare.objects.all().delete()
        if count == 0:
            return Response(
                {"message": "The database was empty"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"message": f"{count} CardShares deleted"}, status=status.HTTP_200_OK
        )

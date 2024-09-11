##rest_framework is best
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Wallet
from .serializer import WalletSerializer

@api_view(['GET', 'POST', 'DELETE'])
def wallet_list(request):
    if request.method == 'GET':
        data = Wallet.objects.all()
        serializer = WalletSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = WalletSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count, _ = Wallet.objects.all().delete()
        if count == 0:
            return Response({'message': 'The database was empty'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': f'{count} Wallets deleted'}, status=status.HTTP_200_OK)
    
@api_view(['DELETE', 'PUT', 'GET', 'PATCH'])
def wallet_pk(request, pk):
    try:
        ptr = Wallet.objects.get(pk=pk)
    except Wallet.DoesNotExist:
        return Response({'error': 'Wallet not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        ptr.delete()
        return Response({'message': 'Wallet deleted'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        serializer = WalletSerializer(ptr)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'PUT':
        serializer = WalletSerializer(ptr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = WalletSerializer(ptr, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

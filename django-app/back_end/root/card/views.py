from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Card, CardShare
from .serializer import CardSerializer, CardShareSerializer, PostCardSerializer


@api_view(['GET', 'POST', 'DELETE'])
def card_list(request):
    if request.method == 'GET':
        data = Card.objects.all()
        serializer = CardSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = PostCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count, _ = Card.objects.all().delete()
        if count == 0:
            return Response({'message': 'The database was empty'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': f'{count} Cards deleted'}, status=status.HTTP_200_OK)
    
@api_view(['DELETE', 'PUT', 'GET', 'PATCH'])
def card_pk(request, pk):
    try:
        ptr = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response({'error': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        ptr.delete()
        return Response({'message': 'Card deleted'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        serializer = CardSerializer(ptr)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'PUT':
        serializer = CardSerializer(ptr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = CardSerializer(ptr, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def card_share_list(request):
    # return Response({'message': 'Card list'}, status=status.HTTP_200_OK)
    if request.method == 'GET':
        data = CardShare.objects.all()
        serializer = CardShareSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = CardShareSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count, _ = CardShare.objects.all().delete()
        if count == 0:
            return Response({'message': 'The database was empty'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': f'{count} CardShares deleted'}, status=status.HTTP_200_OK)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Organisation as M, OrganisationsList 
from .serializer import OrganisationSerializer 




@api_view(['GET', 'POST', 'DELETE'])
def organisation_list(request):
    # print(f'organisation_list: {request.method}')
    # print(f'organisation_list hello_world: {request.data}')
    if request.method == 'GET':
        data = M.objects.all()
        serializer = OrganisationSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        user = request.user
        form_ptr = request.data.copy()
        form_ptr['owner'] = user.id
        serializer = OrganisationSerializer(data=form_ptr)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Serializer Errors:", serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count, _ = M.objects.all().delete()
        if count == 0:
            return Response({'message': 'The database was empty'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'message': f'{count} Organisations deleted'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE', 'PUT', 'GET'])
def organisation_detail(request, pk):
    #organisation owner must be the user
    try:
        ptr = M.objects.get(pk=pk)
    except M.DoesNotExist:
        return Response({'error': 'Organisation not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        ptr.delete()
        return Response({'message': 'Organisation deleted'}, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'GET':
        serializer = OrganisationSerializer(ptr)
        return Response(serializer.data)
        
    elif request.method == 'PUT':
        serializer = OrganisationSerializer(ptr, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
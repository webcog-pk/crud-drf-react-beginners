from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer

# Create Item
@api_view(['POST'])
def create_item(request):
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new item
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Items
@api_view(['GET'])
def get_items(request):
    if request.method == 'GET':
        items = Item.objects.all().order_by('-id')  # Get all items
        serializer = ItemSerializer(items, many=True)  # Serialize the items
        return Response(serializer.data)

# Get Single Item
@api_view(['GET'])
def get_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)  # Get the item by primary key (id)
    except Item.DoesNotExist:
        return Response({'result': 'Bro I think Your are Using Wring ID. Not found :-('}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item)  # Serialize the single item
        return Response(serializer.data)

# Update Item
@api_view(['PUT'])
def update_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)  # Get the item by primary key (id)
    except Item.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)  # Update the item data
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Item
@api_view(['DELETE'])
def delete_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)  # Get the item by primary key (id)
    except Item.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        item.delete()  # Delete the item from the database
        return Response({'detail': 'Item deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

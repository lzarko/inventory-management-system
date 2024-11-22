from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemCreateSerializer, ItemUpdateSerializer, ItemResponseSerializer

class CreateItemView(APIView):
    def post(self, request):
        serializer = ItemCreateSerializer(data=request.data)

        if serializer.is_valid():
            item = serializer.save()
            return Response(ItemResponseSerializer(item).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateItemView(APIView):
    def put(self, request, item_id):
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ItemUpdateSerializer(item, data=request.data, partial=True)

        if serializer.is_valid():
            updated_item = serializer.save()
            return Response(ItemResponseSerializer(updated_item).data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteItemView(APIView):
    def delete(self, request, item_id):
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemListView(APIView):
    def get(self, request):
        items = Item.objects.all()

        serializer = ItemResponseSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ItemDetailView(APIView):
    def get(self, request, item_id):
        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"detail": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ItemResponseSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
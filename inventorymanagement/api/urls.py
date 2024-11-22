from django.urls import path
from api.views import CreateItemView, UpdateItemView, DeleteItemView, ItemListView, ItemDetailView

urlpatterns = [
    path('items/', ItemListView.as_view(), name='item-list'),
    path('items/create/', CreateItemView.as_view(), name='create-item'),
    path('items/<uuid:item_id>/', ItemDetailView.as_view(), name='item-detail'),
    path('items/<uuid:item_id>/update/', UpdateItemView.as_view(), name='update-item'),
    path('items/<uuid:item_id>/delete/', DeleteItemView.as_view(), name='delete-item')
]
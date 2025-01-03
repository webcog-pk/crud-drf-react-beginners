from django.urls import path
from core import views

urlpatterns = [
    path('items/', views.get_items, name='get_items'),  # Get all items
    path('items/<int:pk>/', views.get_item, name='get_item'),  # Get single item
    path('items/create/', views.create_item, name='create_item'),  # Create item
    path('items/<int:pk>/update/', views.update_item, name='update_item'),  # Update item
    path('items/<int:pk>/delete/', views.delete_item, name='delete_item'),  # Delete item
]

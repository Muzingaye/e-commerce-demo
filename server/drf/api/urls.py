from django.urls import path
from . import views 

urlpatterns = [
    path('products/', views.ProductListApiView.as_view()),
    path('products/<int:pk>/', views.ProductDetailAPIView.as_view()),
    path('products/info/', views.prod_info),
    path('orders/', views.OrderListApiView.as_view()),
    path('user-orders/', views.UserOrderListApiView.as_view(), name='user-orders'),
]
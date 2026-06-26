from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path('products/', views.ProductListCreateApiView.as_view()),
    path('products/<int:pk>/', views.ProductDetailAPIView.as_view(),  name='product-detail'),
    path('products/info/', views.ProductInfoView.as_view()),
    path('users/', views.UserListView.as_view()),
    # path('user-orders/', views.UserOrderListApiView.as_view(), name='user-orders'),
]


router =  DefaultRouter()
router.register(f'orders', views.OrderViewSet, basename='order')
urlpatterns += router.urls
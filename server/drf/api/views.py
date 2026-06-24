from django.db.models import Max
from django.http import JsonResponse
from django.shortcuts  import get_object_or_404
from api.serialzers import ProductSerializer, OrderSerializer, ProductInfoSerializer
from api.models import Product, Order
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class ProductListApiView(generics.ListAPIView):
    queryset = Product.objects.filter(stock__gt=0)
    serializer_class = ProductSerializer


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderListApiView(generics.ListAPIView):
    queryset =  Order.objects.prefetch_related(
        'items__product'
        ).all()
    serializer_class = OrderSerializer


class UserOrderListApiView(generics.ListAPIView):
    queryset =  Order.objects.prefetch_related(
        'items__product'
        ).all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()
        return qs.filter(user=user)






@api_view(['GET'])
def prod_info(request):
    products = Product.objects.all();
    serializer = ProductInfoSerializer({
        'products': products,
        'count': len(products),
        'max_price': products.aggregate(max_price=Max('price'))['max_price']
         })
    return Response(serializer.data)

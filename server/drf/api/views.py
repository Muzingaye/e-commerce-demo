from api.models import Order, Product, User
from api.serialzers import (OrderCreateSerializer, OrderSerializer,
                            ProductInfoSerializer, ProductSerializer,
                            UserSerializer)
from django.db.models import Max
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework import filters, generics, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle

from .filters import InStoreFilterBackend, OrderFilter, ProductFilter


class ProductListCreateApiView(generics.ListCreateAPIView):
    throttle_scope = 'products'
    throttle_class = [ScopedRateThrottle]
    queryset = Product.objects.order_by('pk')
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter, 
        filters.OrderingFilter,
        InStoreFilterBackend
        ]
    filterset_class = ProductFilter
    search_fields = ['=name','description']
    ordering_fields = ['name', 'price', 'stock']
    pagination_class = PageNumberPagination
    pagination_class.page_size = 5
    pagination_class.page_query_param = 'pagenum'
    

    @method_decorator(cache_page(60 * 15 * 2, key_prefix=['product_list']))
    @method_decorator(vary_on_headers("Authorization"))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

    def get_queryset(self):
        import time
        time.sleep(2)
        return super().get_queryset()
    
    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        self.permission_classes =[AllowAny]
        if self.request.method in ['PUT', 'DELETE', 'PATCH']:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

class OrderViewSet(viewsets.ModelViewSet):

    throttle_scope = 'orders'

    queryset =  Order.objects.prefetch_related(
        'items__product'
        ).all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend, 
        ]
    filterset_class = OrderFilter
    


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        
        if self.action == 'create' or self.action =='update': #self.request.method == 'POST':
            return OrderCreateSerializer
        return super().get_serializer_class()
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(user=self.request.user)
        return qs


    @action(detail=False, 
            methods=['GET'], 
            url_path='user-orders',
            # permission_classes=[IsAuthenticated]
            )
    def user_orders(self, request):
        orders = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)





class ProductInfoView(APIView):
   def get(self, request):
       products = Product.objects.all();
       serializer = ProductInfoSerializer({
            'products': products,
            'count': len(products),
            'max_price': products.aggregate(max_price=Max('price'))['max_price']
         })
       return Response(serializer.data)
   


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

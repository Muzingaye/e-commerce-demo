import django_filters
from rest_framework import filters
from . models import Product, Order


class InStoreFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(stock__gt=0)

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = {
            'name':  ['exact', 'contains'],
            'price' : ['exact', 'lt', 'gt', 'range']
            }
        


class OrderFilter(django_filters.FilterSet):
    class Meta:
        model = Order
        fields = {
            'status':  ['exact'],
            'created_at' : ['exact', 'lt', 'gt']
            }
from rest_framework import serializers
from  .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Product
        fields = (
            'name',
            'description',
            'price',
            'stock',
        )
        

    def validate_price(self, val):
        if val <= 0:
            raise serializers.ValidationError(
                "Price must be greater than 0"
            )
        return val
        
    def create(self, validated_data):
        return Product(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.content = validated_data.get('content', instance.content)
        instance.created = validated_data.get('created', instance.created)
        return instance
    


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            'product',
            'quantity',
        )
        
class OrderSerializer(serializers.ModelSerializer):
    items =  OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'order_id',
            'user',
            'created_at',
            'status',
            'items',
        )




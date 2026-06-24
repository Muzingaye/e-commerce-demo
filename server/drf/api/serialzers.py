from rest_framework import serializers
from  .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Product
        fields = (
            'id',
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
    
    product_name = serializers.CharField(source = 'product.name')
    product_price = serializers.DecimalField(max_digits=10, decimal_places=2,
                                          source = 'product.price',
                                          )
    class Meta:
        model = OrderItem
        fields = (
            'product_name',
            'product_price',
            'quantity',
            'item_subtotal'
        )
        
class OrderSerializer(serializers.ModelSerializer):
    items =  OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()


    def get_total_price(self, obj):
        order_items = obj.items.all()
        return sum(order_item.item_subtotal for order_item in order_items)

    class Meta:
        model = Order
        fields = (
            'order_id',
            'user',
            'created_at',
            'status',
            'items',
            'total_price',
        )


class ProductInfoSerializer(serializers.Serializer):
    products = ProductSerializer(many=True)
    count = serializers.IntegerField()
    max_price = serializers.FloatField()
    

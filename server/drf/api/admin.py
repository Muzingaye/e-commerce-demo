from api.models import Order, OrderItem, User
from django.contrib import admin


class OrderItemInline(admin.TabularInline):
    model = OrderItem

class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderItemInline
    ]



admin.site.register(Order, OrderAdmin)
admin.site.register(User)

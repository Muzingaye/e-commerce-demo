from django.contrib import admin
from django.urls import include, path
# from api import views as api_views
# from rest_framework import routers


# router =  routers.DefaultRouter()
# router.register(f'products/', api_views.product_list)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls'))
]

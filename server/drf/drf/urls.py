from django.contrib import admin
from django.urls import include, path
# from api import views as api_views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)


# router =  routers.DefaultRouter()
# router.register(f'products/', api_views.product_list)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('silk', include('silk.urls', namespace='silk')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

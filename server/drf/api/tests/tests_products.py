from ..models import User, Product
from ..views import ProductDetailAPIView
from django.urls import reverse
from rest_framework.test import APITestCase


class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(username='admin1', password='adminpass')
        self.normal_user = User.objects.create_superuser(username='user', password='password')
        self.product = Product.objects.create(
            name="Test Product",
            description="Test Description",
            price=9.99,
            stock=10
        )
        self.url =  reverse('product-details', kwargs={'pk': self.product.pk})

    def test_get_product(self):
        resp = self.client.get(self.url)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['name', self.product.name])






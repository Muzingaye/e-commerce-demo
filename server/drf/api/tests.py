from api.models import Order, User, Product
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(username='admin1', password='adminpass')
        self.normal_user = User.objects.create_user(username='user', password='password')
        self.product = Product.objects.create(
            name="Test Product",
            description="Test Description",
            price=9.99,
            stock=10
        )
        self.url =  reverse('product-detail', kwargs={'pk': self.product.pk})

    def test_get_product(self):
        resp = self.client.get(self.url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['name'], self.product.name)


    def test_unauthorized_update_product(self):
        data =  {'name': 'Update Products'}
        resp = self.client.put(self.url, data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_unauthorized_delete_product(self):
        resp = self.client.delete(self.url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_only_admins_can_delete_product(self):

        # normal user TODO Failed
        self.client.login(username='user', password='password')
        resp = self.client.delete(self.url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Product.objects.filter(pk=self.product.pk).exists())

        # admin user
        self.client.login(username='admin1', password='adminpass')
        resp = self.client.delete(self.url)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(pk=self.product.pk).exists())

class UserOrderTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='user1', password='test')
        user2 = User.objects.create_user(username='user2', password='test')
        Order.objects.create(user=user1)
        Order.objects.create(user=user1)
        Order.objects.create(user=user2)
        Order.objects.create(user=user2)

    def test_user_order_endpoint_retrieves_only_authenticate_user_order(self):
        user = User.objects.get(username='user2')
        self.client.force_login(user)
        response  = self.client.get(reverse('orders'))

        assert response.status_code == status.HTTP_200_OK
        orders = response.json()
        self.assertTrue(all(order['user'] == user.id for order in orders))
        # print(data)


    def test_user_order_list_unauthenticated(self):
        response  = self.client.get(reverse('orders'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

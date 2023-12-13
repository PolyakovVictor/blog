from django.test import TestCase

from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Post, Category


# post creation test
class PostViewTestCase(APITestCase):
    def setUp(self):    # create user for test
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = Category.objects.create(name='Test Category')

    def test_create_post(self):     # test create post endpoint with auth
        url = reverse('api:post')
        self.client.force_authenticate(user=self.user)

        data = {
            'title': 'Test Post',
            'description': 'This is a test post',
            'category': self.category.pk,
            'author': self.user.pk,
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().title, 'Test Post')

    def test_create_post_unauthenticated(self):     # test create post endpoint without auth
        url = reverse('api:post')

        data = {
            'title': 'Test Post',
            'description': 'This is a test post',
            'category': self.category.pk,
            'author': self.user.pk,
        }

        response = self.client.post(url, data, format='json')
        print("-------------------------------", response.status_code)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Post.objects.count(), 0)

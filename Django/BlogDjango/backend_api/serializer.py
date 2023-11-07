from rest_framework import serializers
from .models import Post, Tag, Category


# class PostSerializer(serializers.ModelSerializer):
#     title = serializers.CharField(max_lenght=255)
#     image = serializers.ImageField(use_url=True)
#     description = serializers.TimeField()
#     author = serializers.IntegerField()
#     category = serializers.CharField()
#     created_at = serializers.DateTimeField(read_only=True)
#     updated_at = serializers.DateTimeField(read_only=True)

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'image', 'description', 'author', 'category', 'created_at', 'updated_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'posts']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

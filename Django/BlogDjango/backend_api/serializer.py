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
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['title', 'image', 'image_url', 'description', 'author', 'category', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'posts']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

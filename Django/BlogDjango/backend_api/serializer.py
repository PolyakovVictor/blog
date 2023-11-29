from rest_framework import serializers
from .models import Post, Tag, Category, Comment, User, ProfileImage


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'username', 'post', 'content', 'created_at']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProfileImageSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = ProfileImage
        fields = ['profile_image', ]

    def get_profile_image(self, obj):
        if obj.profile_image:
            return self.context['request'].build_absolute_uri(obj.profile_image.url)
        return None


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'image_url', 'description', 'author', 'category', 'tags', 'created_at', 'updated_at', 'comments']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

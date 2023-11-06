from django.forms import ValidationError
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Post, Tag, Category
from .serializer import PostSerializer, CategorySerializer
from rest_framework.response import Response


class PostView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):

        if not request.user.is_authenticated:
            raise ValidationError({"detail": "Пользователь не авторизован"})

        tags_data = request.data.get('tags', [])
        tags = []

        for tag_name in tags_data:
            tag_obj = Tag.objects.get_or_create(name=tag_name)[0]
            tags.append(tag_obj)

        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            post = serializer.save()
            post.tags.add(*tags)
            return Response(serializer.data)


class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        pass


# class TagView(APIView):
#     def get(self,)

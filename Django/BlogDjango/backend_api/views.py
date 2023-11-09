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

        title = request.data.get('title')
        description = request.data.get('description')
        category_name = request.data.get('category')
        category_obj, category_created = Category.objects.get_or_create(name=category_name)
        image = request.data.get('image')
        print(request.FILES)
        tags_data = request.data.get('tags', '')

        tags = [tag.strip() for tag in tags_data.split(' ') if tag.strip()]

        serializer = PostSerializer(data={
            'title': title,
            'description': description,
            'category': category_obj.pk,
            'author': request.user.id,
            'image': image,
        })
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            post = serializer.save()
            for tag_text in tags:
                tag, tag_created = Tag.objects.get_or_create(name=tag_text)
                post.tags.add(tag)
            return Response(serializer.data)
        else:
            return Response(serializer.error, status=400)


class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        pass


# class TagView(APIView):
#     def get(self,)

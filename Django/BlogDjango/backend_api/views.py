from django.forms import ValidationError
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Post, Tag, Category
from .serializer import PostSerializer, CategorySerializer
from rest_framework.response import Response
from . import utils


class PostView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True, context={'request': request})

        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            raise ValidationError({"detail": "User not authorized"})

        title, description, category_obj, image, tags = utils.get_data_from_request(request)

        serializer = PostSerializer(data={
            'title': title,
            'description': description,
            'category': category_obj.pk,
            'author': request.user.id,
            'image': image,
        }, context={'request': request})

        if serializer.is_valid(raise_exception=True):
            post = serializer.save()
            utils.add_or_create_tag(tags=tags, post=post)
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

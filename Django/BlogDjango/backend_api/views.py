from django.forms import ValidationError
from rest_framework.views import APIView
from .models import Post, Category
from .serializer import PostSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from . import utils


class PostViewPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostView(APIView):
    pagination_class = PostViewPagination

    def get(self, request):
        posts = Post.objects.all()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(result_page, many=True, context={'request': request})

        return paginator.get_paginated_response(serializer.data)

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

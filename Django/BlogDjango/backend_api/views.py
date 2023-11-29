from django.forms import ValidationError
from rest_framework.views import APIView
from .models import FavoritePost, Post, Category, Tag, ProfileImage
from .serializer import PostSerializer, CategorySerializer, TagSerializer, CommentSerializer, ProfileImageSerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from . import utils
from rest_framework import generics, status
from django.shortcuts import get_object_or_404


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

        title, description, category_obj, image, tags = utils.get_post_data_from_request(request)

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


class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(pk=self.kwargs['pk'])


class CommentView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            raise ValidationError({"detail": "User not authorized"})
        request_data = request.data.copy()
        request_data['user'] = str(request.user.id)
        serializer = CommentSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        pass


class TagView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)


class PostListByTagView(generics.ListAPIView):
    pagination_class = PostViewPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        tag_id = self.kwargs['tag_id']
        tag = get_object_or_404(Tag, id=tag_id)
        posts = Post.objects.filter(tags=tag)
        return posts

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)


class PostListByCategoryView(generics.ListAPIView):
    pagination_class = PostViewPagination
    serializer_class = PostSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        category = get_object_or_404(Category, id=category_id)
        posts = Post.objects.filter(category=category)
        return posts

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)


class ProfileImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProfileImageSerializer

    def put(self, request, *args, **kwargs):
        try:
            profile = ProfileImage.objects.get(user=request.user)
        except ProfileImage.DoesNotExist:
            profile = ProfileImage(user=request.user)

        profile.profile_image = request.data.get('profile_image')
        profile.save()

        serializer = ProfileImageSerializer(profile, data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        try:
            profile = ProfileImage.objects.get(user=request.user)
            serializer = ProfileImageSerializer(profile, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProfileImage.DoesNotExist:
            return Response("Profile Image not found", status=status.HTTP_404_NOT_FOUND)


class CreateOrRemoveFavoritePostView(APIView):    # Check the post on favorite add if it doesn't exist, and remove it from favorites if it does
    def post(self, request, post_id):
        if request.user.is_authenticated:
            post = get_object_or_404(Post, pk=post_id)
            favorite, created = FavoritePost.objects.get_or_create(user=request.user, post=post)
            if created:
                return Response({'message': 'The post has been added to favorites', 'available': True})
            else:
                favorite.delete()
                return Response({'message': 'The post has been removed from favorite', 'available': False})
        else:
            return Response({'message': 'User not authenticated'}, status=401)

    def get(self, request, post_id):
        if request.user.is_authenticated:
            post = get_object_or_404(Post, pk=post_id)
            is_favorite = FavoritePost.objects.filter(user=request.user, post=post).exists()
            return Response({'available': is_favorite})
        else:
            return Response({'available': False})


class FavoritePostsListView(APIView):
    pagination_class = PostViewPagination
    serializer_class = PostSerializer

    def get_queryset(self, user_id):
        favorite_posts = FavoritePost.objects.filter(user=user_id)
        posts = [fav_post.post for fav_post in favorite_posts]
        return posts

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset(request.user)
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)


class UserPostsListView(APIView):
    pagination_class = PostViewPagination
    serializer_class = PostSerializer

    def get_queryset(self, user_id):
        favorite_posts = Post.objects.filter(author=user_id)
        return favorite_posts

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset(request.user)
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)

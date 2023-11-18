from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'api'

urlpatterns = [
    path('post/', views.PostView.as_view(), name='post'),
    path('post/by_tag/<int:tag_id>/', views.PostListByTag.as_view(), name='post-list-by-tags'),
    path('post/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('categories/', views.CategoryView.as_view(), name='category'),
    path('comment/', views.CommentView.as_view(), name='comment'),
    path('tag/', views.TagView.as_view(), name='tag'),
]

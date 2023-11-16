from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'api'

urlpatterns = [
    path('post/', views.PostView.as_view(), name='post'),
    path('categories/', views.CategoryView.as_view(), name='category'),
    path('tag/', views.TagView.as_view(), name='tag'),
    path('post/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
]

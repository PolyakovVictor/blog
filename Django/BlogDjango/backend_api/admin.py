from django.contrib import admin
from .models import Post, Category, Tag, Comment, FavoritePost


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'user')


@admin.register(FavoritePost)
class FavoritePostAdmin(admin.ModelAdmin):
    list_display = ('post', 'user')

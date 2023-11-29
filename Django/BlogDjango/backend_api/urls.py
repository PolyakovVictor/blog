from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('post/', views.PostView.as_view(), name='post'),
    path('post/by_tag/<int:tag_id>/', views.PostListByTagView.as_view(), name='post-list-by-tags'),
    path('post/by_category/<int:category_id>/', views.PostListByCategoryView.as_view(), name='post-list-by-category'),
    path('post/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('categories/', views.CategoryView.as_view(), name='category'),
    path('comment/', views.CommentView.as_view(), name='comment'),
    path('tag/', views.TagView.as_view(), name='tag'),
    path('profile_image/', views.ProfileImageView.as_view(), name='upload-profile-image'),
    path('post/check_on_post_favorite/<int:post_id>', views.CreateOrRemoveFavoritePostView.as_view(), name='add-post-to-favorite'),
    path('post/favorite_posts_list_by_user/', views.FavoritePostsListView.as_view(), name='favorite-posts-list'),
    path('post/user_posts_list_view/', views.UserPostsListView.as_view(), name='user-posts-list')
]

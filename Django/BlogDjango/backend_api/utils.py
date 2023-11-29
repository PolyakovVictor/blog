from .models import Category, Tag


def get_post_data_from_request(request):
    title = request.data.get('title')
    description = request.data.get('description')
    category_name = request.data.get('category')
    category_obj, category_created = Category.objects.get_or_create(name=category_name)
    image = request.data.get('image')
    tags_data = request.data.get('tags', '')
    tags = [tag.strip() for tag in tags_data.split(' ') if tag.strip()]
    return (title, description, category_obj, image, tags)


def get_comment_data_from_request(request):
    pass


def add_or_create_tag(tags, post):
    for tag_name in tags:
        tag, tag_created = Tag.objects.get_or_create(name=tag_name)
        post.tags.add(tag)

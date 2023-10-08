from django.db import models


class Post(models.Model):
    title = models.CharField('Post title', max_length=100)
    description = models.TextField('Text post')
    author = models.CharField('Autor name', max_length=100)
    date = models.DateField('Publication date')

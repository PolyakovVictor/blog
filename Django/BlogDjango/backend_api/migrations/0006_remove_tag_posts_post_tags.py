# Generated by Django 4.2.6 on 2023-11-07 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0005_category_post_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='posts',
        ),
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(to='backend_api.tag'),
        ),
    ]

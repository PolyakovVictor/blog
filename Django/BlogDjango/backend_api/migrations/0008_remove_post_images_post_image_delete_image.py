# Generated by Django 4.2.6 on 2023-11-08 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0007_image_remove_post_image_post_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='images',
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(null=True, upload_to='post_images/'),
        ),
        migrations.DeleteModel(
            name='Image',
        ),
    ]

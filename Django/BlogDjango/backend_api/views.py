from django.shortcuts import render
from rest_framework.views import APIView
from .models import Post
from .serializer import PostSerializer
from rest_framework.response import Response


class PostView(APIView):
    def get(self, request):
        output = [
            {
                "title": output.title,
                "description": output.description,
                "author": output.author,
                "date": output.date
            } for output in Post.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

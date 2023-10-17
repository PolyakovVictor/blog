from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import status
from .serializer import RegistrationSerializer, LoginSerializer
from django.contrib.auth import authenticate, login


class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = RegistrationSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        print(email, password)
        user = authenticate(request, email=email, password=password)
        print('user', user)
        if user:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

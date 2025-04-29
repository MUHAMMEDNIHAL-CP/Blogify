from rest_framework import generics, permissions
from .models import Blog
from .serializers import BlogSerializer
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class BlogListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def perform_update(self, serializer):
        if self.request.user != self.get_object().author:
            raise PermissionDenied('You can only edit your own blogs.')
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.author:
            raise PermissionDenied('You can only delete your own blogs.')
        instance.delete()

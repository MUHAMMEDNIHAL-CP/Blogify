from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'author_username', 'created_at', 'updated_at']
        read_only_fields = ['author']

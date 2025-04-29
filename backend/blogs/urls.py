from django.urls import path
from .views import BlogListCreateView, BlogDetailView

app_name = 'blogs'

urlpatterns = [
    path('', BlogListCreateView.as_view(), name='blog-list-create'),
    path('<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
]

from rest_framework import viewsets, filters 
from .models import Album,Photo
from .serializers import AlbumSerializer, PhotoSerializer

class AlbumViewSet(viewsets.ModelViewSet): 
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'description')


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all() 
    serializer_class = AlbumSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('album', 'title', 'image','description')


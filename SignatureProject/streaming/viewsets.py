from rest_framework import viewsets, filters 
from .models import *
from .serializers import * 

class Streaming_Serializer_ViewSet(viewsets.ModelViewSet): 
    queryset = Streaming.objects.all() 
    serializer_class = Streaming_Serializer
    filter_backends = (filters.SearchFilter,)


    # filter_fields = ('music_title','music_img','music_w')

# class Artist_Serializer_ViewSet(viewsets.ModelViewSet): 
#     queryset = Artist.objects.all() 
#     serializers_class = Artist_Serializer
#     filter_backends = (filters.SearchFilter,) 


# class Artist_Serializer_ViewSet(viewsets.ModelViewSet): 
#     queryset = Artist.objects.all() 
#     serializers_class = Artist_Serializer
#     filter_backends = (filters.SearchFilter,)



# class Album_Searializer_ViewSet(viewsets.ModelViewSet): 
#     queryset = Album.objects.all() 
#     serializers_class= Album_Serializer
#     filter_backends = (filters.SearchFilter,)




















# class TMusic_Stake_Serializer_ViewSet(viewsets.ModelViewSet):
#     queryset = TMusic_Stake.objects.all() 
#     serializer_class = TMusic_Stake_Serializer
#     filter_backends = (filters.SearchFilter,)
#     filter_fields = ('music_id','ownmail','per','per_date')


# class TMusic_StakePer_Serializer_ViewSet(viewsets.ModelViewSet):
#     queryset = TMusic_StakePer.objects.all() 
#     serializer_class = TMusic_StakePer_Serializer
#     filter_backends = (filters.SearchFilter,)


# class TMusic_Coin_Serializer_ViewSet(viewsets.ModelViewSet): 
#     queryset = TMusic_Coin.objects.all() 
#     serializer_class = TMusic_Coin_Serializer
#     filter_backends = (filters.SearchFilter,)

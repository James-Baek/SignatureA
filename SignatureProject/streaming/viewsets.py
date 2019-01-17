from rest_framework import viewsets, filters 
from .models import *
from .serializers import * 

class TMusic_Source_Serializer_ViewSet(viewsets.ModelViewSet): 
    queryset = TMusic_Source.objects.all() 
    serializer_class = TMusic_Source_Serializer
    filter_backends = (filters.SearchFilter,)
    filter_fields = ('music_title','music_genre','music_w','music_m')


class TMusic_Stake_Serializer_ViewSet(viewsets.ModelViewSet):
    queryset = TMusic_Stake.objects.all() 
    serializer_class = TMusic_Stake_Serializer
    filter_backends = (filters.SearchFilter,)
    filter_fields = ('music_id','ownmail','per','per_date')


class TMusic_StakePer_Serializer_ViewSet(viewsets.ModelViewSet):
    queryset = TMusic_StakePer.objects.all() 
    serializer_class = TMusic_StakePer_Serializer
    filter_backends = (filters.SearchFilter,)


class TMusic_Coin_Serializer_ViewSet(viewsets.ModelViewSet): 
    queryset = TMusic_Coin.objects.all() 
    serializer_class = TMusic_Coin_Serializer
    filter_backends = (filters.SearchFilter,)

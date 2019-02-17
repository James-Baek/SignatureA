from rest_framework import serializers
from .models import *

class Streaming_Serializer(serializers.ModelSerializer):
    albums = serializers.StringRelatedField
    artists = serializers.StringRelatedField
    class Meta: 
        model = Streaming
        fields = ('music_genre','albums','artists')
        depth=1


class Album_Serializer(serializers.ModelSerializer): 
   
    class Meta:
        model = Album 
        fields = ('name','id','music_w','music_m','agency','price','url','hash')
        

class Artist_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Artist 
        fields = ('name','mbid','url')








# class Image_Serializer(serializers.ModelSerializer): 
#     class Meta: 
#         model = Image 
#         fields = '__all__'
        







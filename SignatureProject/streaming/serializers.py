from rest_framework import serializers
from .models import *

class Streaming_Serializer(serializers.ModelSerializer):
    albums = serializers.StringRelatedField
    artists = serializers.StringRelatedField
    class Meta: 
        model = Streaming
        fields = ('music_w','music_m','agency','music_img','music_price','albums','artists')
        depth=1


class Album_Serializer(serializers.ModelSerializer): 
   
    class Meta:
        model = Album 
        fields = ('name','playcount','mbid','url','hash')
        

class Artist_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Artist 
        fields = ('name','mbid','url')








# class Image_Serializer(serializers.ModelSerializer): 
#     class Meta: 
#         model = Image 
#         fields = '__all__'
        







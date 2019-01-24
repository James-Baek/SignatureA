from rest_framework import serializers
from .models import * 


class Album_Serializer(serializers.ModelSerializer): 
    class Meta:
        model = Album 
        fields = ('name','playcount','mbid','url','hash')


class Artist_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Artist 
        fields = ('name','mbid','url')


class Streaming_Serializer(serializers.ModelSerializer):
    albums = serializers.StringRelatedField
    artists = serializers.StringRelatedField
    class Meta: 
        model = Streaming
        fields = ('id','music_w','music_m','agency','music_img','music_price','albums','artists')
        depth=1






# class Image_Serializer(serializers.ModelSerializer): 
#     class Meta: 
#         model = Image 
#         fields = '__all__'
        





# class TMusic_Stake_Serializer(serializers.ModelSerializer):
#     class Meta: 
#         fields = '__all__'


# class TMusic_StakePer_Serializer(serializers.ModelSerializer): 
#     class Meta: 
#         model = TMusic_StakePer
#         fields = '__all__'


# class TMusic_Coin_Serializer(serializers.ModelSerializer):
#     class Meta: 
#         model = TMusic_Coin
#         fields = '__all__'


# class TMusic_SourceRank_Serializer(serializers.ModelSerializer):
#     class Meta: 
#         model = TMusic_SourceRank
#         fields = '__all__'
   








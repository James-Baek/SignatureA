from rest_framework import serializers
from .models import * 

class TMusic_Source_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = TMusic_Source
        fields= '__all__'
        # depth=1

# class Artist_Serializer(serializers.ModelSerializer):
#     class Meta: 
#         model = Artist 
#         fields = ('name','mbid','url')



# class Album_Serializer(serializers.ModelSerializer): 
#     class Meta:
#         model = Album 
#         fields = ('name','playcount','mbid','url','hash')
       

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
   








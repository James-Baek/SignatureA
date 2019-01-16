import rest_framework import serializers
from .models import * 

class TMusic_Source_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = TMusic_Source
        fields = '__all__'


class TMusic_Stake_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = TMusic_Stake
        fields = '__all__'


class TMusic_StakePer_Serializer(serializers.ModelSerializer): 
    class Meta: 
        model = Serializer
        fields = '__all__'


class TMusic_Coin_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = TMusic_Coin
        fields = '__all__'


class TMusic_SourceRank_Serializer(serializers.ModelSerializer):
    class Meta: 
        model = TMusic_SourceRank
        fields = '__all__'
   








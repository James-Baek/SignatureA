from django.db import models
from django import forms 
# from django.contrib.auth.models import User  
from datetime import date,datetime,time
# Create your models here.
import uuid 
# from user.models import User
# from users.models import User

class Streaming(models.Model):
    # start_date = models.DateField('발매일',auto_now=False,auto_now_add=True,null=True)
    # id = models.IntegerField(primary_key=True)
    music_w = models.CharField('작사가',max_length=30)  
    music_m = models.CharField('작곡가',max_length=30,blank=True,null=True)      
    agency = models.CharField('기획사',max_length=30) 
    music_img = models.URLField('음원 이미지 경로',max_length=200,null=True,blank=True) 
    music_price = models.IntegerField('음원가격',null=True,blank=True)
    # album_ph = models.ImageField('앨범사진',max_length=30,null=True,blank=True,upload_to=None)
    # playcount = models.IntegerField('총 재생수',null=True,blank=True)
    # music_len = models.IntegerField('음원총길이',null=True,blank=True)
    # sound_type = models.CharField('음질종류',max_length=10,null=True,blank=True)
    # lyrics = models.CharField('가사',max_length=254,null=True,blank=True)  # charField 인가 Int인가 
     # total_income = models.IntegerField('총 음원수입',null=True,blank=True)
    # music_r = models.CharField('편곡가',max_length=30,blank=True,null=True)
    # thumbnail = models.URLField('썸네일 이미지',max_length=200,null=True,blank=True)
    # music_genre = models.IntegerField('음악장르') 

class Artist(models.Model):
    album = models.ForeignKey('Streaming',related_name='artists',on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField('아티스트 사진 설명페이지url',max_length=254)
    


class Album(models.Model):
    streaming = models.ForeignKey('Streaming',related_name='albums',on_delete=models.CASCADE)
    name = models.CharField('앨범이름',max_length=100)
    playcount = models.IntegerField('플레이카운트')
    mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField('photo및 상세앨범',max_length=254)  
    hash = models.URLField('해쉬값',max_length=254)
            
    class Meta: 
        unique_together =('url','name')
        ordering = ['name']

    def __unicode__(self):
        return '%d:%s' % (self.playcount, self.name)




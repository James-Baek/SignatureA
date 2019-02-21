from django.db import models
from django import forms 
from django.urls import reverse
# from django.contrib.auth.models import User  
from datetime import date,datetime,time
from django.utils.timezone import *
# Create your models here.
import uuid 
# from user.models import User
# from users.models import User

class Streaming(models.Model):
    # start_date = models.DateField('발매일',auto_now=False,auto_now_add=True,null=True)
    # id = models.IntegerField(primary_key=True)
    music_w = models.CharField('작사가',max_length=30,null=True)  
    music_img = models.URLField('음원 이미지 경로',max_length=200,null=True,blank=True) 
    music_genre = models.IntegerField('음악장르',null=True) 
    # album_ph = models.ImageField('앨범사진',max_length=30,null=True,blank=True,upload_to=None)
    # playcount = models.IntegerField('총 재생수',null=True,blank=True)
    # music_len = models.IntegerField('음원총길이',null=True,blank=True)
    # sound_type = models.CharField('음질종류',max_length=10,null=True,blank=True)
    # lyrics = models.CharField('가사',max_length=254,null=True,blank=True)  # charField 인가 Int인가 
     # total_income = models.IntegerField('총 음원수입',null=True,blank=True)
    # music_r = models.CharField('편곡가',max_length=30,blank=True,null=True)
    # thumbnail = models.URLField('썸네일 이미지',max_length=200,null=True,blank=True)
    

class Artist(models.Model):
    album = models.ForeignKey('Streaming',related_name='artists',on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField('아티스트 사진 설명페이지url',max_length=254)
   
    

class Album(models.Model):
    streaming = models.ForeignKey('Streaming',related_name='albums',on_delete=models.CASCADE)
    id = models.IntegerField(primary_key=True)
    name = models.CharField('앨범이름',max_length=100)
    music_w = models.CharField('작사가',max_length=30,null=True)  
    music_m = models.CharField('작곡가',max_length=30,blank=True,null=True)      
    agency = models.CharField('기획사',max_length=30,null=True) 
    price = models.IntegerField('음원가격',null=True)
    # mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField('photo및 상세앨범',max_length=254)  
    hash = models.URLField('해쉬값',max_length=254)
   
            
    class Meta: 
        unique_together =('url','name')
        ordering = ['name']

    def __unicode__(self):
        return '%d:%s' % (self.id, self.name)



class InsertUpload(models.Model):
    email = models.EmailField(max_length=30)
    artist = models.CharField('아티스트',max_length=32)
    songwriter= models.CharField('작곡가',max_length=32)
    song_name = models.CharField('노래 이름',max_length=32,null=True)
    price = models.BigIntegerField('가격')
    genre = models.CharField('장르',max_length=20,null=True)
    description = models.CharField('설명',max_length=150,null=True)
    music_file = models.FileField(upload_to='documents/%Y',null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.email

    def get_absolute_url(self): #redirect 활용시 
        return reverse('streaming:albumupload')
# , args=[self.id,]


# def min_length_3_validator(value): 
#     if len(value)<30:
#         raise forms.ValidationError('30글자 이상 입력해주세요')

# InsertUpload 랑 통합 
# class Document(models.Model):
#     description = models.CharField(max_length=255, blank=True)
#     document = models.FileField(upload_to='documents/%Y')
#     uploaded_at = models.DateTimeField(auto_now_add=True)


   
# def user_directory_path(instance, filename):
#     # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#     return 'user_{0}/{1}'.format(instance.user.id, filename)

# class MyModel(models.Model):
#     upload = models.FileField(upload_to=user_directory_path)




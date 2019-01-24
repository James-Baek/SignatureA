from django.db import models
from django import forms 
# from django.contrib.auth.models import User  
from datetime import date,datetime,time
# Create your models here.
# import uuid 
# from user.models import User
# from users.models import User


# 음원 테이블 


class TMusic_Source(models.Model):
    music_id = models.IntegerField('음원ID',primary_key=True) #자동적으로 id가 생성됨. 
    # artist_id = models.ForeignKey('User', on_delete=models.CASCADE) # fk 지정방법? 
    album_id = models.IntegerField('앨범ID')
    # thumbnail = models.URLField('썸네일 이미지',max_length=200,null=True,blank=True)
    music_title = models.CharField('음악제목',max_length=30)
    # music_genre = models.IntegerField('음악장르') 
    # start_date = models.DateField('발매일',auto_now=False,auto_now_add=True) 
    music_w = models.CharField('작사가',max_length=30)  
    # music_m = models.CharField('작곡가',max_length=30,blank=True,null=True)      
    # music_r = models.CharField('편곡가',max_length=30,blank=True,null=True)
    agency = models.CharField('기획사',max_length=30) 
    # music_len = models.IntegerField('음원총길이',null=True,blank=True)
    # sound_type = models.CharField('음질종류',max_length=10,null=True,blank=True)
    # lyrics = models.CharField('가사',max_length=254,null=True,blank=True)  # charField 인가 Int인가 
    music_img = models.URLField('음원 이미지 경로',max_length=200,null=True,blank=True) 
    playcount = models.IntegerField('총 재생수',null=True,blank=True)
    music_price = models.IntegerField('음원가격',null=True,blank=True)
    # total_income = models.IntegerField('총 음원수입',null=True,blank=True)
    album_ph = models.ImageField('앨범사진',max_length=30,null=True,blank=True,upload_to=None)
    hash = models.URLField('음원 IPFS해쉬값',max_length=200,null=True,blank=True) 

    # music_id = models.IntegerField('음원ID') #자동적으로 id가 생성됨. 
    # mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # artist= models.ForeignKey('Artist', on_delete=models.CASCADE) # fk 지정방법? 
    # album= models.ForeignKey('Album',on_delete=models.CASCADE) #FK 지정
    # thumbnail = models.URLField('썸네일 이미지',max_length=200,null=True,blank=True)
    # music_title = models.CharField('음악제목',max_length=30)
    # music_genre = models.IntegerField('음악장르') 
    # start_date = models.DateField('발매일',auto_now=False,auto_now_add=True) 
    # music_w = models.CharField('작사가',max_length=30)  
    # music_m = models.CharField('작곡가',max_length=30,blank=True,null=True)      
    # music_r = models.CharField('편곡가',max_length=30,blank=True,null=True)
    # agency = models.CharField('기획사',max_length=30) 
    # music_len = models.IntegerField('음원총길이',null=True,blank=True)
    # sound_type = models.CharField('음질종류',max_length=10,null=True,blank=True)
    # lyrics = models.CharField('가사',max_length=254,null=True,blank=True)  # charField 인가 Int인가 
    # music_img = models.URLField('음원 이미지 경로',max_length=200,null=True,blank=True) 
    # music_price = models.IntegerField('음원가격',null=True,blank=True)
    # total_income = models.IntegerField('총 음원수입',null=True,blank=True)
    # album_ph = models.ImageField('앨범사진',max_length=30,null=True,blank=True,upload_to=None)
    # hash = modelss.URLField('음원 IPFS해쉬값',max_length=200,null=True,blank=True) 
    
    class Meta: 
        ordering = ['music_id']


# class Artist(models.Model):
#     # music = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     url = models.URLField('아티스트 사진 설명페이지url',max_length=254)



# class Album(models.Model):
#     name = models.CharField('앨범이름',max_length=100)
#     playcount = models.IntegerField('플레이카운트')
#     mbid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     url = models.URLField('photo및 상세앨범',max_length=254)  
#     hash = models.URLField('해쉬값',max_length=254)
   



# class Image(models.Model):
#     music = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     url = models.URLField(max_length=254)
#     size = models.CharField(max_length=100) 

#     def __str__(self):
#         return str('[%s] %s'%(self.uuid, self.url))
#     def __unicode__(self):
#         return str('[%s] %s'%(self.uuid, self.url))

#     class Meta: 
#         index_together = [
#             ('uuid','url'),
#         ]


# 음원 지분 테이블 
# class TMusic_Stake(models.Model): 
#     index_ms = models.IntegerField('Index')
#     music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     ownmail = models.EmailField('보유자 이메일',max_length=254)
#     per = models.IntegerField('지분수')
#     per_date = models.DateTimeField('지분 생성날짜',auto_now_add=True)


# # 보유 음원 지분 테이블 
# class TMusic_StakePer(models.Model): 
#     index_msp = models.IntegerField('Index')
#     ownmail = models.ForeignKey('TMusic_Stake',on_delete=models.CASCADE)
#     music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     per = models.IntegerField('보유 지분수')
#     income_per = models.IntegerField('수익')
#     perdate = models.DateTimeField('지분 보유날짜',auto_now_add=True)


# # 음원순위 테이블 
# class TMusic_SourceRank(models.Model): 
#     music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     totcnt = models.IntegerField('누적횟수')
#     totamt = models.IntegerField('누적금액')
#     lastdate = models.DateTimeField('지분 생성날짜',auto_now_add=True)


# #음원 코인 테이블 
# class TMusic_Coin(models.Model): 
#     index_coin = models.IntegerField('INDEX')
#     # email = models.ForeignKey('User',on_delete=models.CASCADE)
#     music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     amt = models.BigIntegerField('금액')
#     models.DateTimeField('코인 사용시간',auto_now_add=True)



# # 코드 테이블 
# class TCode_Master(models.Model): 
#     major_id = models.IntegerField('그룹코드id') 
#     minor_id = models.IntegerField('세부코드id',primary_key=True)
#     code_label = models.CharField('코드레이블',null=True,blank=True,max_length=10) 
   



# class Image(models.Model):
#     music = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
#     uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     url = models.URLField(max_length=254)
#     size = models.CharField(max_length=100) 

#     def __str__(self):
#         return str('[%s] %s'%(self.uuid, self.url))
#     def __unicode__(self):
#         return str('[%s] %s'%(self.uuid, self.url))

#     class Meta: 
#         index_together = [
#             ('uuid','url'),
#         ]






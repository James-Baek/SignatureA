from django.db import models
from django import forms 
# Create your models here.
from django.db import models
from django.contrib.auth.models import User #login/ logout 
from datetime import date,datetime,time
# Create your models here.

# 음원 테이블 
class TMusic_Source(models.Model):
    music_id = models.IntegerField('음원ID')
    artist_id = models.ForeignKey('TUser_Atist', on_delete=models.CASCADE) # fk 지정방법? 
    album_id = models.IntegerField('앨범ID')
    music_title = models.CharField('음악제목',max_length=30)
    music_genre = models.IntegerField('음악장르') 
    start_date = models.DateField('발매일',auto_now=False,auto_now_add=True) 
    music_w = models.CharField('작사가',max_length=30)  
    music_m = models.CharField('작곡가',max_length=30)      
    music_r = models.CharField('편곡가',max_length=30)
    agency = models.CharField('기획사',max_lenth=30) 
    music_len = models.IntegerField('음원총길이')
    sound_type = models.CharField('음질종류',max_length=10)
    lyrics = models.CharField('가사',max_length=254)  # charField 인가 Int인가 
    music_img = models.CharField('음원 이미지 경로',max_length=30) 
    play_cnt = models.IntegerField('총 재생수')
    music_price = models.IntegerField('음원가격')
    total_income = models.IntegerField('총 음원수입')
    album_ph = models.CharField('앨범사진',max_length=30)
    hash = models.CharField('음원 IPFS해쉬값',max_length=100) 


    def __str__(self): 
        return self.title

# 음원 지분 테이블 
class TMusic_Stake(models.Model): 
    INDEX_MS = models.IntegerField('Index')
    music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
    ownmail = models.CharField('보유자 이메일',max_length=254)
    per = models.IntegerField('지분수')
    per_date = models.DateTimeField('지분 생성날짜',auto_now_add=True)

# 보유 음원 지분 테이블 
class TMusic_StakePer(models.Model): 
    INDEX_MSP = models.IntegerField('Index')
    ownmail = models.ForeignKey('TMusic_Stake',on_delete=models.CASCADE)
    music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
    per = models.IntegerField('보유 지분수')
    income_per = models.IntegerField('수익')
    perdate = models.DateTimeField('지분 보유날짜',auto_now_add=True)

# 음원순위 테이블 
class TMusic_SourceRank(models.Model): 
    music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
    totcnt = models.IntegerField('누적횟수')
    totamt = models.IntegerField('누적금액')
    lastdate = models.DateTimeField('지분 생성날짜',auto_now_add=True)

#음원 코인 테이블 
class TMusic_Coin(models.Model): 
    INDEX_Coin = models.IntegerField('INDEX')
    email = models.ForeignKey('TUser_Atist',on_delete=models.CASCADE)
    music_id = models.ForeignKey('TMusic_Source',on_delete=models.CASCADE)
    amt = models.BigIntegerField('금액')
    models.DateTimeField('코인 사용시간',auto_now_add=True)



# 기본회원 테이블 
class TUser_Basic(models.Model):    
    email = models.EmailField(max_length=254)
    pw = models.CharField('패스워드',max_length=40)
    authority_code = models.IntegerField("권한부여코드")
    nname = models.CharField('닉네임',max_length=30)
    profile = models.CharField('프로필이미지',max_length=100)
    coin = models.IntegerField('총보유코인')
    nation = models.IntegerField('국적코드')
    pw2 = models.CharField('패스워드2')
    update =models.DateTimeField('수정일',auto_now_add=True)
    entdate = models.DateTimeField('가입일자',auto_now_add=True)
    user_type = models.IntegerField('회원구분')


# 아티스트 테이블 
class TUser_Atist(models.Model):
    artist_id = models.IntegerField('아티스트 id')
    email = models.ForeignKey('TUser_Basic',on_delete=models.CASCADE)
    user_password = models.CharField('패스워드',max_length=40)
    authority_code = models.IntegerField("권한부여코드")
    name = models.CharField("이름",max_length=30)
    company_id = models.ForeignKey('TUser_Company',on_delete=models.CASCADE)
    music_type = models.IntegerField('장르코드')
    gender = models.IntegerField('성별')
    faceph = models.CharField('얼굴 사진',max_length=50)
    area = models.CharField('출생 지역')
    etc = models.CharField('특징')

    def __str__(self): 
        return self.email


# 기업회원 테이블 
class TUser_Company(models.Model):
    company_id = models.IntegerField('회사 id') 
    email = models.ForeignKey('TUser_Atist',on_delete=models.CASCADE)
    company = models.IntegerField()  #pk 설정 
    company_name = models.IntegerField()
    compnay_representation = models.IntegerField() 

# 코드 테이블 
class TCode_Master(models.Model): 
    major_id = models.IntegerField('그룹코드id')
    minor_id = models.IntegerField('세부코드id')
    totamt = models.CharField('코드레이블') # ??  





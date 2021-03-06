from django.db import models
# Create your models here.
# from __future__ import unicode_literals 
from django.utils.encoding import python_2_unicode_compatible
from django.db import models 
from django.urls import reverse 
from photo.fields import ThumbnailImageField #사진에 대한 원본 이미지와 썸네일 이미지 모두 저장 


@python_2_unicode_compatible
class Album(models.Model): 
    name = models.CharField(max_length=50)
    description = models.CharField('Several Line Description', max_length=100, blank=True)
    upload_date = models.DateTimeField('Upload Date',auto_now_add=True,null=True)
    agency = models.CharField('기획사',max_length=30,null=True)
    title = models.CharField(max_length=50,null=True)
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name 

    def get_absolute_url(self): 
        return reverse('photo:album_detail',args=(self.id,))
        
@python_2_unicode_compatible
class Photo(models.Model):
    album = models.ForeignKey(Album,on_delete=models.CASCADE)
    title = models.CharField(max_length=50,null=True)
    image = ThumbnailImageField(upload_to='photo/%Y/%M')
    # image_test = models.ImageField(upload_to='null',blank=True,null=True)
    image_test2 = models.URLField(blank=True,null=True)
    description = models.TextField('photo Description',blank=True)
    upload_date = models.DateTimeField('Upload Date',auto_now_add=True)
    agency = models.CharField('기획사',max_length=30,null=True) 
    videourl = models.URLField('유튜브',max_length=50,null=True)


    class Meta: 
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_absolute_url(self): 
        return reverse('photo:photo_detail',args=(self.id,))







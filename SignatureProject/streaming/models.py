from django.db import models
from user.models import User
# Create your models here.

class Music(models.Model):
    title = models.CharField(max_length=150)
    artist_id = models.ForeignKey(User,on_delete=models.CASCADE)


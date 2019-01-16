from rest_framework import routers 
from photo.viewsets import * 
# from streaming.viewsets import *  

router = routers.DefaultRouter()

router.register('photo',PhotoViewSet)
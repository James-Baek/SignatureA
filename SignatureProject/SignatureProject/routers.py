from rest_framework import routers 
from photo.viewsets import * 
from streaming.viewsets import *  

router = routers.DefaultRouter()

router.register('photo',PhotoViewSet)
router.register('streaming',TMusic_Source_Serializer_ViewSet)
router.register('streaming/stake',TMusic_Stake_Serializer_ViewSet)

from django.contrib import admin 
from django.urls import path, include
from streaming.views import *
from django.conf.urls.static import static #photo 앱 추가 
from django.conf import settings #photo 앱 추가


app_name="streaming"

urlpatterns = [ 
    path('',MusicMain.as_view(),name='index'),
    path('detail',StreamingDetail.as_view(),name='detail'), 
    path('play',MusicStreaming.as_view(),name='play'),
    path('search',SearchFormView.as_view(),name='search'),
    path('photo/',include('photo.urls',namespace="photo")), #photo urls 추가하기 
    path('test/',StreamingTest.as_view(),name="test"),
]

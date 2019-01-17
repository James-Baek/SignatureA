from django.contrib import admin 
from django.urls import path 
from streaming.views import *

app_name="streaming"

urlpatterns = [ 
    path('',MusicMain.as_view(),name='index'),
    path('detail',StreamingDetail.as_view(),name='detail'), 
    path('play',MusicStreaming.as_view(),name='play'),
    path('search',SearchFormView.as_view(),name='search'),
   
]

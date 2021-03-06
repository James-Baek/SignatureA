"""streaming URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin 
from django.views.generic import *
from .routers import router

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets  # rest_frame_work 설정 
from django.urls import path, include
from SignatureProject.views import HomeView
# from SSoundMusic.views import UserCreateView, UserCreateDoneTV 

from django.conf.urls.static import static #photo 앱 추가 
from django.conf import settings #photo 앱 추가


from . import views

urlpatterns = [
    # path('accounts/', include('django.contrib.auth.urls')),
    # path('accounts/register/', UserCreateView.as_view(), name='register'),
    # path('accounts/register/done/', UserCreateDoneTV.as_view(), name='register_done'),
    path('', HomeView.as_view(), name='home'),
    path('api/',include(router.urls)),
    path('admin/', admin.site.urls),
    path('photo/',include('photo.urls', namespace='photo')), #photo 앱 추가 
    path('streaming/',include('streaming.urls',namespace="streaming")), #스트리밍앱 추가 
    path('user/', include('user.urls')),
    path('main/', include('main.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) #추가 

 


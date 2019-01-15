from django.contrib import admin
from streaming.models import * 
# Register your models here.

class MusicRegisterAdmin(admin.ModelAdmin): 
    list_display = ['artist_id','music_id','hash']

class BasicAdmin(admin.ModelAdmin): 
    list_display = ['nname','profile','coin']

class ArtistAdmin(admin.ModelAdmin):
    list_display = ['email']

admin.site.register(TMusic_Source,MusicRegisterAdmin)
admin.site.register(TUser_Basic,BasicAdmin)
admin.site.register(TUser_Atist,ArtistAdmin)
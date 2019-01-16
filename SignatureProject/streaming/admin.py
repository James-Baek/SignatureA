from django.contrib import admin
from streaming.models import * 
# Register your models here.

class MusicRegisterAdmin(admin.ModelAdmin): 
    list_display = ['artist_id','music_id','hash','music_title']

class BasicAdmin(admin.ModelAdmin): 
    list_display = ['nname','profile','coin']

class ArtistAdmin(admin.ModelAdmin):
    list_display = ['email']


class TableCode(admin.ModelAdmin): 
    list_display = ['major_id','minor_id','code_label']



admin.site.register(TMusic_Source,MusicRegisterAdmin)
admin.site.register(TUser_Basic,BasicAdmin)
admin.site.register(TUser_Atist,ArtistAdmin)
admin.site.register(TCode_Master,TableCode)

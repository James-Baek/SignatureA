from django.contrib import admin
from streaming.models import * 
# Register your models here.

class MusicRegisterAdmin(admin.ModelAdmin): 
    list_display = ('artist','title','hash')

class BasicAdmin(admin.ModelAdmin): 
    list_display = ()

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('email','profile_url')

admin.site.register(TMusic_Source,MusicRegisterAdmin)
admin.site.register(TUser_Atist,ArtistAdmin)
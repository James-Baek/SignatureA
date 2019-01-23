from django.contrib import admin
from streaming.models import * 
from user.models import * 
# Register your models here.

class MusicRegisterAdmin(admin.ModelAdmin): 
    list_display = ['music_id']


# class BasicAdmin(admin.ModelAdmin): 
#     list_display = ['nname','profile','coin']

# class ArtistAdmin(admin.ModelAdmin):
#     list_display = ['mbid']


# class AlbumAdmin(admin.ModelAdmin):
#     list_display=['mbid']
# class TableCode(admin.ModelAdmin): 
#     list_display = ['major_id','minor_id','code_label']


admin.site.register(TMusic_Source,MusicRegisterAdmin)
# admin.site.register(Artist,ArtistAdmin)
# admin.site.register(Album,AlbumAdmin)


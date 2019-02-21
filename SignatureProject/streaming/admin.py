from django.contrib import admin
from streaming.models import * 
from user.models import * 
# Register your models here.

# class StreamingRegisterAdmin(admin.ModelAdmin): 
#     list_display = ['music_w']


# class ArtistAdmin(admin.ModelAdmin): 
#     list_display=['name']

# class AlbumAdmin(admin.ModelAdmin): 
#     list_display=['name']


# # class BasicAdmin(admin.ModelAdmin): 
# #     list_display = ['nname','profile','coin']

# # class ArtistAdmin(admin.ModelAdmin):
# #     list_display = ['mbid']


# # class AlbumAdmin(admin.ModelAdmin):
# #     list_display=['mbid']
# # class TableCode(admin.ModelAdmin): 
# #     list_display = ['major_id','minor_id','code_label']


# admin.site.register(Streaming,StreamingRegisterAdmin)
# admin.site.register(Artist,ArtistAdmin)
# admin.site.register(Album,AlbumAdmin)

admin.site.register(Streaming)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(InsertUpload) 
# admin.site.register(Document)



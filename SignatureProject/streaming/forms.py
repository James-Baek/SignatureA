from django import forms 
from .models import *
from django.forms.models import inlineformset_factory

class MusicSearchForm(forms.Form): 
    search_word = forms.CharField(label='Search Word')

# # documnet form 
# class DocumentForm(forms.Form):
#     docfile = forms.FileField(
#         label = 'Select a file',
#         help_text = 'max. 42 megabytes'

StreamingUpload = inlineformset_factory(Stremaing)
    fields = ['music_w','music_m','agency','music_img','music_price'],
    extra = 2)

    
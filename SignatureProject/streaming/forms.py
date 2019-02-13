from django import forms 
from streaming.models import Streaming,Album
from streaming.models import Streaming
from django.forms.models import inlineformset_factory
# from photo.models import *

class MusicSearchForm(forms.Form): 
    search_word = forms.CharField(label='Search Word')

# # documnet form 
# class DocumentForm(forms.Form):
#     docfile = forms.FileField(
#         label = 'Select a file',
#         help_text = 'max. 42 megabytes'






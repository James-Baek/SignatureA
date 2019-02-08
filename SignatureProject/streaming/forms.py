from django import forms 
from .models import *

class MusicSearchForm(forms.Form): 
    search_word = forms.CharField(label='Search Word')

# # documnet form 
# class DocumentForm(forms.Form):
#     docfile = forms.FileField(
#         label = 'Select a file',
#         help_text = 'max. 42 megabytes'
#         )

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()
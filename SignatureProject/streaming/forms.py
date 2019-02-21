from django import forms 
from streaming.models import *
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



class UploadForm(forms.Form):
    email = forms.CharField()
    artist = forms.CharField()
    music_m = forms.CharField() 
    price = forms.IntegerField()
    genre = forms.CharField() 
    description = forms.CharField()
    document = forms.FileField()
    uploaded_at = forms.DateTimeField()

    #ModelForm 비슷하게 구현 
    def save(self, commit=True): 
        uploadForm = UploadForm(**self.cleaned_data)
        if commit: 
            uploadForm.save() 

        return uploadForm 



# class DocumentForm(forms.ModelForm): 
#     class Meta:
#         model = Document
#         fields = ('description','document',) 

from django.shortcuts import render
from django.views.generic import ListView, DetailView 
from photo.models import Album,Photo 

from django.conf import settings 
from django.core.files.storage import FileSystemStorage

from django.views.generic.edit import CreateView,UpdateView, DeleteView 
from main.views import LoginRequiredMixin 
from django.urls import reverse, reverse_lazy
# Create your views here.

class AlbumLV(ListView): 
    model = Album
    template_name = 'album_list.html' 

class AlbumDV(DetailView): 
    model = Album
    template_name = 'album_detail.html'

class PhotoDV(DetailView): 
    model = Photo 
    template_name = 'photo_detail.html'



from django.shortcuts import redirect 
from photo.forms import PhotonlineFormSet 


class PhotoCreateView(LoginRequiredMixin, CreateView): 
    model = Photo 
    fields = ['album','title','image']
    success_url = reverse_lazy('photo:upload')

    def form_valid(self, form):
        form.instance.owner = self.request.user 
        return super(PhotoCreateView, self).form_valid(form)



class AlbumPhotoCV(LoginRequiredMixin, CreateView):
    model = Album
    fields = ['name', 'description']
    template_name = 'photo/streaming_upload.html'

    def get_context_data(self,**kwargs): 
        context = super(AlbumPhotoCV, self).get_context_data(**kwargs)
        if self.request.POST: 
            context['formset'] = PhotonlineFormSet(self.request.POST, self.request.FILES)
        else:
            context['formset'] = PhotonlineFormSet()
            return context 

    def form_valid(self, form): 
        form.instance.owner = self.request.user 
        context = self.get_context_data() 
        formset = context['formset']
        for streamingform in formset:
            streamingform.instance.owner = self.request.user 
        
        if formset.is_valid(): 
            self.object = form.save() 
            formset.instance = self.object 
            formset.save() 
            return redirect(self.object.get_absolute_url())
        
        else: 
            return self.render_to_response(self.get_context_data(form=form))


from django.views.generic import ListView,DetailView,TemplateView 
from django.views.generic.dates import ArchiveIndexView, YearArchiveView, MonthArchiveView 
from django.views.generic.dates import DayArchiveView, TodayArchiveView
from django.views.generic import FormView #클래스형 제네릭뷰
# Create your views here.
from django.views.generic.edit import FormView
from streaming.forms import *
from django.db.models import Q 
from django.shortcuts import render, render_to_response #단축함수 render  

#파일 업로드 기능 구현 
from django.template import RequestContext
from django.urls import reverse 
# from django.views.decorators.csrf import csrf_protect
# from django.utils.decorators import method_decorator
from django.conf import settings 
from django.core.files.storage import FileSystemStorage

from django.http import HttpResponseRedirect
from .models import *
from .forms import * 


import subprocess
import json


class SearchFormView(FormView): 
    form_class = MusicSearchForm 
    template_name = 'streaming/streaming_search.html'

    def form_vaild(self,form): 
        schWord = '%s' % self.request.POST['search_word']
        music_list = Music.objects.filter(Q(title__icontains=schWord) | Q(artist__icontains=schWord) | Q(album__icontains=schWord) 
                    | Q(genre__icontains=schWord)).distinct() 

        context = {}
        context['form'] = form 
        context['search_term'] = schWord 
        context['object_list'] = music_list 

        return render(self.request, self.template_name, render) 

class MusicStreaming(TemplateView):
    template_name='streaming/streaming_play.html'

    def get_context_data(self, **kwargs):
        result = subprocess.check_output(["node", "test.js", "queryUser", "USER5"])
        a = json.loads(result.decode('utf-8'))
        
        context = super(MusicStreaming, self).get_context_data(**kwargs)
        context['userinfo'] = a
        # context['balance'] = a['balance']
        # context['authority'] = a['authority']

        print(context)
        print(self.request.user)
        return context
    

class MusicMain(TemplateView): 
    template_name='streaming/streaming.html'

class StreamingDetail(TemplateView): 
    template_name='streaming/streaming_detail.html'

class streaming_upload(TemplateView): 
    template_name='streaming/upload.html'

class streaming_main(TemplateView):
    template_name = 'streaming/streaming_main.html'
    
class streaming_audio(TemplateView): 
    template_name = 'streaming/audio.html'

class gene(TemplateView): 
    template_name = 'streaming/gene.html'

# method_decorator(csrf_protect) 
# def streaming_upload_file(request):
#     if request.method == 'POST':
#         form = DocumentForm(request.POST, request.FILES)
#         if form.is_valid():
#             newdoc = Document(docfile = request.FILES['docfile'])
#             newdoc.save()
 
#             return HttpResponseRedirect(reverse('streaming.upload_file'))
#     else:
#         form = DocumentForm()
 
#     documents = Document.objects.all()
 
#     return render_to_response(
#         'streaming/upload.html',
#         {'documents': documents, 'form': form},
#         context_instance=RequestContext(request)
#     )   

# def upload_file(request): 
#     if request.method == 'POST':
#         form = DocumentForm(request.POST, request.FILES)
#         if form.is_valid(): 
#             form.save()
#             return HttpResponseRedirect(reverse_lazy('streaming:upload'))

#         else: 
#             form = DocumentForm() 
#             return render(request,'streaming/upload.html', {'form': form})


# def handle_uploaded_file(f): 
#     with open('some/file/name.txt', 'wb+') as destination: 
#         for chunk in f.chunks(): 
#             destination.write(chunk)









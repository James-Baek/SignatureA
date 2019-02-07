from django.views.generic import ListView,DetailView,TemplateView 
from django.views.generic.dates import ArchiveIndexView, YearArchiveView, MonthArchiveView 
from django.views.generic.dates import DayArchiveView, TodayArchiveView
from django.views.generic import FormView #클래스형 제네릭뷰
# Create your views here.
from django.views.generic.edit import FormView
from streaming.forms import MusicSearchForm
from django.db.models import Q 
from django.shortcuts import render #단축함수 render  


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
        result = subprocess.check_output(["node", "test.js"])
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
    

class streaming_test2(TemplateView):
    template_name='streaming/streaming_test2.html'
    
class streaming_test3(TemplateView): 
    template_name='streaming/streaming_test3.html'

class streaming_test4(TemplateView):
    template_name='streaming/streaming_test4.html'

class streaming_test5(TemplateView):
    template_name='streaming/streaming_test5.html'

class streaming_sound(TemplateView): 
    template_name='streaming/streaming_sound.html'

class streaming_upload(TemplateView): 
    template_name='streaming/streaming_upload.html'


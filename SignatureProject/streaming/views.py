from django.views.generic import ListView,DetailView,TemplateView 
from django.views.generic.dates import ArchiveIndexView, YearArchiveView, MonthArchiveView 
from django.views.generic.dates import DayArchiveView, TodayArchiveView
from django.views.generic import FormView #클래스형 제네릭뷰
# Create your views here.
from django.views.generic.edit import FormView
# from streaming.forms import *
from django.db.models import Q 
from django.shortcuts import render_to_response #단축함수 render  
from django.shortcuts import render

#파일 업로드 기능 구현 
from django.template import RequestContext
from django.urls import reverse, reverse_lazy
# from django.views.decorators.csrf import csrf_protect
# from django.utils.decorators import method_decorator
from django.conf import settings 
from django.core.files.storage import FileSystemStorage

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from .models import *
from .forms import * 

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from main.views import LoginRequiredMixin
from photo.views import * 


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

    def get_context_data(self, **kwargs):                  #user.email
        result = subprocess.check_output(["node", "UserQuery.js", "queryUser",self.request.user.email])
        a = json.loads(result.decode('utf-8'))
        
        context = super(MusicStreaming, self).get_context_data(**kwargs)
        context['userinfo'] = a
        # context['balance'] = a['balance']
        # context['authority'] = a['authority']

        print(context)
        print(self.request.user)
        print(self.request.user.coin)
        print(a['balance'])
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
    template_name = 'streaming/myalbum.html'

class todo(TemplateView): 
    template_name = 'streaming/todo.html'
    
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


# class Form(request):
#     return render(request,"streaming/form.html",{})


from .models import InsertUpload

def Form(request):
    return render(request,"streaming/form.html",{})


# def DbUpload(request,email,artist,music_m,price):

#     InsertUpload(email=email, artist=artist, music_m=music_m,price=price).save()
#     context = {'email' : email, 
#     'artist' :  artist, 
#     'music_m' : music_m,
#     'price' : price
#     }

#     return render(request,'streaming/form_upload.html', context)


class Player(TemplateView): 
    template_name = 'streaming/player.html'




# def DisplayUpload(request,email): 
#     result = InsertUpload.objects.filter(email=email)[0]
#     uploadInfo = "EMAIL:{0}; ARTIST:{1}; MUSIC_M :{2}; PRICE:{3}".format(result.email,result.artist,result.music_m,result.price)
#     return render(request,'streaming/form_upload.html',{ 'welcome' : uploadInfo })

def getHash():
    result = subprocess.check_output(["python", "ipfsUpload.py"]).decode('utf-8')

    return result

def UploadAlbum(request):
    if request.method == "POST":
        form = UploadForm(request.POST, request.FILES)

        if form.is_valid():


            album = InsertUpload()
            album.email = form.cleaned_data['email']
            album.artist = form.cleaned_data['artist']
            album.songwriter = form.cleaned_data['songwriter']
            album.songname = form.cleaned_data['songname']
            album.price = form.cleaned_data['price']
            album.genre = form.cleaned_data['genre']
            album.description = form.cleaned_data['description']
            album.music_file = form.cleaned_data['music_file']

            album.save()

            album_instance = InsertUpload.objects.get(id=album.id)
            album_instance.hash = getHash()
            album_instance.save()

            return render(request, 'streaming/form_upload_success.html', {
                    'hash':album_instance.hash,
            })

    else:
        form = UploadForm()
        # else:
        #     return render(request,'streaming/form_upload_fail.html', {})

        return render(request, 'streaming/form_upload.html', {
            'form':form,
    })


# def Upload(request): 
#     for count, x in enumerate(request.FILES.getlist("files")):
#         def process(f):
#             with open('/Users/a/Desktop/projects/media/{{files}}' + str(count) + '.mp3','wb+') as destination:
#                 for chunk in f.chunks():
#                     destination.write(chunk)

#         process(x)
#     # return HttpResponse("File(s) uploaded!")
#     return render(request,"streaming/form_upload.html",{})




# def model_form_upload(request):
#     if request.method == 'POST':
#         form = DocumentForm(request.POST, request.FILES)
#         if form.is_valid():

#             forms = Document() 
#             forms.description = form.cleaned_data['description']
#             forms.document = form.cleanded_data['document']
#             forms.save()

#             return render(request, 'streaming/form_upload.html', {
#         'form': form,
#     })
#     else:
#         form = DocumentForm()
#     return render(request, 'streaming/form_upload.html', {
#         'form': form
#     })


def uploadsuccess(request): 
	insertuploads = InsertUpload.objects.all() 
	context = { 'insertuploads' : insertuploads } 
		# context에 모든 정보를 저장 
	return render(request, 'streaming/form_upload_success.html', context) 
		# context 안에 있는 정보를 html에 전달하기 



# from django.views.generic import CreateView 

# class UploadGenericCreateView(CreateView):
#     model = InsertUpload
#     fields = ['email','artist','music_m','price']
#     success_url = reverse_lazy('upload_generic:list')




# import subprocess
# import json 


# class HashMake():
#     result = subprocess.check_output(["node", "ipfsUpload.js", "./SignatureProject/media/documents/2019", "butterfly.mp3"]).decode('utf-8')
#     a = result.find("hash") + 7
#     b = a + 46
#     hash = result[a:b]
# print(result[a:b])

# def UpdateHash(request): 
#     if request.method == "POST":
#         form = HashForm(request.POST, request.FILES)
        
#         if form is_valid(): 
#             hash = Hash()
#             hash.



    
    
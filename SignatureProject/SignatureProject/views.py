
from django.views.generic.base import TemplateView

from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy


from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader

class HomeView(TemplateView):
    template_name = "home.html"

class UserCreateView(CreateView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    success_url = reverse_lazy('register_done')

class UserCreateDoneTV(TemplateView):
    template_name = 'registration/register_done.html'


# # Create your views here.

# def home(request):
#     return render(request, 'home.html')

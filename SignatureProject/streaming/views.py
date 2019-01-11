from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader


# Create your views here.

def streaming(request):
    return render(request, 'streaming/streaming.html')
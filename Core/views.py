from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class Dashboard(TemplateView):
    template_name = 'index.html'


class Test(TemplateView):
    template_name = 'index.html'

class Test2(TemplateView):
    template_name = 'index-copy.html'

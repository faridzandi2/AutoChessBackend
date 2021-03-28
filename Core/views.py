from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class Dashboard(TemplateView):
    template_name = 'base.html'


class Test(TemplateView):
    template_name = 'base2.html'
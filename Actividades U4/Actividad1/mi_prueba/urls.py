from django.contrib import admin
from django.urls import path
from django.shortcuts import render

# Esta función responde al navegador
def home(request):
    return render(request, 'index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home), # Esta es la página principal
]
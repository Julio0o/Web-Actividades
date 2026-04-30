from django.contrib import admin
from django.urls import path
from servicios import views

urlpatterns = [
    path('admin/',           admin.site.urls),
    path('',                 views.home,           name='home'),
    path('panel/',           views.panel,          name='panel'),
    path('panel/solicitudes/', views.solicitudes,  name='solicitudes'),
    path('api/servicios/',   views.servicios_json, name='servicios_json'),
    path('api/contacto/',    views.contacto_api,   name='contacto_api'),
]
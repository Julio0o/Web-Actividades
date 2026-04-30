from django.contrib import admin
from .models import Servicio, SolicitudContacto


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('orden', 'icon', 'name', 'color')
    list_display_links = ('name',)
    list_editable = ('orden',)
    ordering = ('orden', 'id')


@admin.register(SolicitudContacto)
class SolicitudContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'servicio_interes', 'fecha_envio')
    list_filter = ('fecha_envio', 'servicio_interes')
    search_fields = ('nombre', 'email', 'mensaje')
    readonly_fields = ('fecha_envio',)
    ordering = ('-fecha_envio',)

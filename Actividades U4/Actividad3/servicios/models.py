from django.db import models


class Servicio(models.Model):
    icon  = models.CharField(max_length=10, default='⚙️')
    name  = models.CharField(max_length=120)
    desc  = models.TextField()
    tags  = models.CharField(max_length=300, help_text='Tags separados por comas')
    color = models.CharField(max_length=20, default='#00e5ff')
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['orden', 'id']

    def tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]

    def __str__(self):
        return self.name


class SolicitudContacto(models.Model):
    nombre           = models.CharField(max_length=150)
    email            = models.EmailField(max_length=254)
    telefono         = models.CharField(max_length=20, blank=True, default='')
    servicio_interes = models.CharField(max_length=120, blank=True, default='')
    mensaje          = models.TextField()
    fecha_envio      = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_envio']
        verbose_name = 'Solicitud de contacto'
        verbose_name_plural = 'Solicitudes de contacto'

    def __str__(self):
        return '{} — {}'.format(self.nombre, self.fecha_envio.strftime('%d/%m/%Y %H:%M'))

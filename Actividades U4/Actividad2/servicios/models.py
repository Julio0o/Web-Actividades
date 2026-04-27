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

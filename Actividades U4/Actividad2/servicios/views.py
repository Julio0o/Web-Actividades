import json
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Servicio


# ─── Página principal ─────────────────────────────────────────────────────────
def home(request):
    return render(request, 'index.html')


# ─── JSON: lista de servicios para el JS ──────────────────────────────────────
def servicios_json(request):
    servicios = Servicio.objects.all()
    data = [
        {
            'id':    s.id,
            'icon':  s.icon,
            'name':  s.name,
            'desc':  s.desc,
            'tags':  s.tags_list(),
            'color': s.color,
        }
        for s in servicios
    ]
    return JsonResponse({'servicios': data})


# ─── Panel de gestión (GET: lista + formulario, POST: guardar) ────────────────
def panel(request):
    servicios = Servicio.objects.all()
    editar    = None

    if request.method == 'POST':
        accion = request.POST.get('accion')

        if accion == 'crear':
            Servicio.objects.create(
                icon  = request.POST.get('icon',  '⚙️').strip(),
                name  = request.POST.get('name',  '').strip(),
                desc  = request.POST.get('desc',  '').strip(),
                tags  = request.POST.get('tags',  '').strip(),
                color = request.POST.get('color', '#00e5ff').strip(),
                orden = int(request.POST.get('orden', 0)),
            )
            return redirect('panel')

        elif accion == 'editar':
            sid = request.POST.get('id')
            s   = get_object_or_404(Servicio, pk=sid)
            s.icon  = request.POST.get('icon',  s.icon).strip()
            s.name  = request.POST.get('name',  s.name).strip()
            s.desc  = request.POST.get('desc',  s.desc).strip()
            s.tags  = request.POST.get('tags',  s.tags).strip()
            s.color = request.POST.get('color', s.color).strip()
            s.orden = int(request.POST.get('orden', s.orden))
            s.save()
            return redirect('panel')

        elif accion == 'eliminar':
            sid = request.POST.get('id')
            get_object_or_404(Servicio, pk=sid).delete()
            return redirect('panel')

    # Si se pide editar un servicio (GET con ?editar=id)
    editar_id = request.GET.get('editar')
    if editar_id:
        editar = get_object_or_404(Servicio, pk=editar_id)

    return render(request, 'panel.html', {'servicios': servicios, 'editar': editar})

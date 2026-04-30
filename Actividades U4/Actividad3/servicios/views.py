import json
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .models import Servicio, SolicitudContacto


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


# ─── API: Recibir formulario de contacto (POST JSON) ─────────────────────────
@csrf_exempt
@require_POST
def contacto_api(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'ok': False, 'error': 'JSON inválido.'}, status=400)

    nombre   = (data.get('nombre') or '').strip()
    email    = (data.get('email') or '').strip()
    telefono = (data.get('telefono') or '').strip()
    servicio = (data.get('servicio_interes') or '').strip()
    mensaje  = (data.get('mensaje') or '').strip()

    # Validaciones básicas
    errores = []
    if not nombre:
        errores.append('El nombre es obligatorio.')
    if not email or '@' not in email:
        errores.append('Ingresa un email válido.')
    if not mensaje:
        errores.append('El mensaje es obligatorio.')

    if errores:
        return JsonResponse({'ok': False, 'errores': errores}, status=400)

    solicitud = SolicitudContacto.objects.create(
        nombre=nombre,
        email=email,
        telefono=telefono,
        servicio_interes=servicio,
        mensaje=mensaje,
    )

    return JsonResponse({
        'ok': True,
        'mensaje': '¡Solicitud enviada correctamente!',
        'id': solicitud.id,
    })


# ─── Panel: ver solicitudes recibidas ─────────────────────────────────────────
def solicitudes(request):
    lista = SolicitudContacto.objects.all()

    if request.method == 'POST':
        accion = request.POST.get('accion')
        if accion == 'eliminar':
            sid = request.POST.get('id')
            get_object_or_404(SolicitudContacto, pk=sid).delete()
            return redirect('solicitudes')

    return render(request, 'solicitudes.html', {'solicitudes': lista})

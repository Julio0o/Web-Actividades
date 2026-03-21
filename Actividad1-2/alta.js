/* =============================================
   SysCode Solutions — alta.js
   =============================================
   - Formulario para agregar nuevo servicio
   - Validaciones completas con sugerencias
   - Almacenamiento en localStorage
   - Redirección a servicios al guardar
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {
    var app = document.getElementById('app-alta');
    app.appendChild(crearHeaderAlta());
    app.appendChild(crearSeccionFormulario());
    app.appendChild(crearFooterAlta());
});

// ============================================
// 1. HEADER
// ============================================

function crearHeaderAlta() {
    var header = document.createElement('header');
    header.className = 'site-header';

    var inner = document.createElement('div');
    inner.className = 'header-inner';

    // Logo — vuelve al inicio
    var logo = document.createElement('div');
    logo.className = 'logo';
    logo.onclick = function () { window.location.href = 'index.html'; };

    var logoIcon = document.createElement('div');
    logoIcon.className = 'logo-icon';
    logoIcon.textContent = '⟨/⟩';

    var logoText = document.createElement('span');
    logoText.textContent = 'Soluciones Informaticas';

    logo.appendChild(logoIcon);
    logo.appendChild(logoText);

    // Botón volver
    var backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary back-btn';
    backBtn.innerHTML = '← Volver a Servicios';
    backBtn.onclick = function () {
        window.location.href = 'index.html#servicios';
    };

    inner.appendChild(logo);
    inner.appendChild(backBtn);
    header.appendChild(inner);
    return header;
}

// ============================================
// 2. FOOTER
// ============================================

function crearFooterAlta() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';

    var inner = document.createElement('div');
    inner.className = 'footer-inner';

    var copy = document.createElement('p');
    copy.textContent = '© 2026 SysCode Solutions — Ingeniería en Sistemas Computacionales';

    inner.appendChild(copy);
    footer.appendChild(inner);
    return footer;
}

// ============================================
// 3. SECCIÓN FORMULARIO
// ============================================

function crearSeccionFormulario() {
    var section = document.createElement('section');
    section.className = 'section form-section';

    // — Encabezado —
    var headerDiv = document.createElement('div');
    headerDiv.className = 'section-header';

    var tag = document.createElement('span');
    tag.className = 'section-tag';
    tag.textContent = 'Catálogo';

    var titulo = document.createElement('h2');
    titulo.className = 'section-title';
    titulo.textContent = 'Agregar Nuevo Servicio';

    var desc = document.createElement('p');
    desc.className = 'section-desc';
    desc.textContent = 'Completa el formulario para registrar un nuevo servicio en el catálogo.';

    headerDiv.appendChild(tag);
    headerDiv.appendChild(titulo);
    headerDiv.appendChild(desc);
    section.appendChild(headerDiv);

    // — Tarjeta del formulario —
    var formWrap = document.createElement('div');
    formWrap.className = 'form-wrap';

    // Mensaje de éxito (oculto inicialmente)
    var successMsg = document.createElement('div');
    successMsg.className = 'alert-success';
    successMsg.id = 'success-msg';
    successMsg.style.display = 'none';
    successMsg.innerHTML = '✓ <strong>¡Servicio agregado exitosamente!</strong> Redirigiendo al catálogo...';
    formWrap.appendChild(successMsg);

    // — Definición de campos —
    var campos = [
        {
            id: 'nombre',
            label: 'Nombre del Servicio *',
            type: 'text',
            placeholder: 'Ej. Desarrollo Web Full-Stack',
            hint: 'Entre 3 y 100 caracteres. Solo letras, números y espacios.'
        },
        {
            id: 'descripcion',
            label: 'Descripción *',
            type: 'textarea',
            placeholder: 'Describe el servicio de forma clara y detallada...',
            hint: 'Entre 20 y 500 caracteres.'
        },
        {
            id: 'precio',
            label: 'Precio (MXN) *',
            type: 'number',
            placeholder: 'Ej. 1500',
            hint: 'Número positivo mayor a 0. Máximo 2 decimales.'
        },
        {
            id: 'imagen',
            label: 'URL de Imagen',
            type: 'text',
            placeholder: 'https://ejemplo.com/imagen.png (opcional)',
            hint: 'Opcional. URL válida que comience con http:// o https://'
        }
    ];

    // — Crear cada grupo de campo —
    campos.forEach(function (campo) {
        var group = document.createElement('div');
        group.className = 'form-group';

        // Label
        var label = document.createElement('label');
        label.className = 'form-label';
        label.setAttribute('for', campo.id);
        label.textContent = campo.label;

        // Input o Textarea
        var input;
        if (campo.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 4;
        } else {
            input = document.createElement('input');
            input.type = campo.type;
            if (campo.type === 'number') {
                input.min = '0';
                input.step = '0.01';
            }
        }
        input.className = 'form-input';
        input.id = campo.id;
        input.name = campo.id;
        input.placeholder = campo.placeholder;

        // Contador de caracteres para campos de texto
        var counter = null;
        if (campo.id === 'nombre' || campo.id === 'descripcion') {
            counter = document.createElement('span');
            counter.className = 'char-counter';
            counter.id = 'counter-' + campo.id;
            var maxLen = campo.id === 'nombre' ? 100 : 500;
            counter.textContent = '0 / ' + maxLen;

            input.addEventListener('input', (function (inputEl, maxL, countEl) {
                return function () {
                    var len = inputEl.value.length;
                    countEl.textContent = len + ' / ' + maxL;
                    if (len > maxL) {
                        countEl.classList.add('counter-over');
                    } else {
                        countEl.classList.remove('counter-over');
                    }
                };
            })(input, maxLen, counter));
        }

        // Texto de ayuda
        var hint = document.createElement('span');
        hint.className = 'form-hint';
        hint.textContent = campo.hint;

        // Div de error (oculto inicialmente)
        var errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.id = 'error-' + campo.id;
        errorDiv.style.display = 'none';

        group.appendChild(label);
        group.appendChild(input);
        if (counter) group.appendChild(counter);
        group.appendChild(hint);
        group.appendChild(errorDiv);

        formWrap.appendChild(group);
    });

    // — Botón submit —
    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary form-submit-btn';
    submitBtn.type = 'button';
    submitBtn.id = 'submit-btn';
    submitBtn.innerHTML = 'Agregar Servicio <span class="btn-arrow">→</span>';
    submitBtn.onclick = function () { manejarSubmit(); };

    formWrap.appendChild(submitBtn);
    section.appendChild(formWrap);
    return section;
}

// ============================================
// 4. VALIDACIONES
// ============================================

/**
 * Valida todos los campos y retorna un objeto con los errores encontrados.
 * Cada clave es el id del campo con error; el valor es el mensaje con sugerencia.
 */
function obtenerErrores() {
    var errores = {};

    var nombre     = document.getElementById('nombre').value.trim();
    var descripcion = document.getElementById('descripcion').value.trim();
    var precioStr  = document.getElementById('precio').value.trim();
    var imagen     = document.getElementById('imagen').value.trim();

    // ——— NOMBRE ———
    if (!nombre) {
        errores.nombre = 'El nombre es obligatorio. Ingresa el nombre del servicio. Ej: "Soporte Técnico".';
    } else if (nombre.length < 3) {
        errores.nombre = 'El nombre es muy corto (mínimo 3 caracteres). Actualmente tiene ' + nombre.length + '. Ej: "Soporte Técnico".';
    } else if (nombre.length > 100) {
        errores.nombre = 'El nombre es muy largo (máximo 100 caracteres). Actualmente tiene ' + nombre.length + '. Intenta resumirlo.';
    } else if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/.test(nombre)) {
        errores.nombre = 'El nombre debe contener al menos una letra. Evita usar solo números o símbolos.';
    }

    // ——— DESCRIPCIÓN ———
    if (!descripcion) {
        errores.descripcion = 'La descripción es obligatoria. Explica en qué consiste el servicio.';
    } else if (descripcion.length < 20) {
        errores.descripcion = 'La descripción es muy corta (mínimo 20 caracteres). Actualmente tiene ' + descripcion.length + '. Detalla más el servicio.';
    } else if (descripcion.length > 500) {
        errores.descripcion = 'La descripción es muy larga (máximo 500 caracteres). Actualmente tiene ' + descripcion.length + '. Recorta el texto.';
    }

    // ——— PRECIO ———
    if (!precioStr) {
        errores.precio = 'El precio es obligatorio. Ingresa el costo del servicio en MXN. Ej: "1500".';
    } else if (isNaN(Number(precioStr))) {
        errores.precio = 'El precio debe ser un número válido. Ej: "1500" o "2500.50". No uses letras ni símbolos como "$".';
    } else if (Number(precioStr) <= 0) {
        errores.precio = 'El precio debe ser mayor a 0. Ingresa un valor positivo.';
    } else if (Number(precioStr) > 9999999) {
        errores.precio = 'El precio parece demasiado alto. Verifica que el valor sea correcto (máximo 9,999,999).';
    } else if (!/^\d+(\.\d{1,2})?$/.test(precioStr)) {
        errores.precio = 'El precio solo puede tener hasta 2 decimales. Ej: "1500" o "1500.50".';
    }

    // ——— IMAGEN (opcional) ———
    if (imagen) {
        if (!/^https?:\/\/.+\..+/.test(imagen)) {
            errores.imagen = 'La URL no es válida. Debe comenzar con "http://" o "https://". Ej: "https://ejemplo.com/imagen.png".';
        } else if (!/\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i.test(imagen)) {
            errores.imagen = 'La URL no parece ser una imagen. Usa una URL que termine en .png, .jpg, .jpeg, .gif, .webp o .svg.';
        }
    }

    return errores;
}

// ============================================
// 5. MOSTRAR / LIMPIAR ERRORES EN UI
// ============================================

/**
 * Muestra los mensajes de error en el formulario.
 * Agrega clase visual al input con error.
 */
function mostrarErrores(errores) {
    var ids = ['nombre', 'descripcion', 'precio', 'imagen'];

    ids.forEach(function (id) {
        var input    = document.getElementById(id);
        var errorDiv = document.getElementById('error-' + id);

        if (errores[id]) {
            // Mostrar error
            errorDiv.innerHTML = '⚠ ' + errores[id];
            errorDiv.style.display = 'block';
            input.classList.add('input-error');
            input.classList.remove('input-success');
        } else {
            // Campo válido
            errorDiv.style.display = 'none';
            errorDiv.innerHTML = '';
            input.classList.remove('input-error');
            // Solo marcar como válido si tiene contenido (o imagen que es opcional)
            if (input.value.trim() || id === 'imagen') {
                input.classList.add('input-success');
            }
        }
    });
}

// ============================================
// 6. MANEJAR SUBMIT
// ============================================

/**
 * Valida el formulario. Si no hay errores, guarda en localStorage y redirige.
 */
function manejarSubmit() {
    var errores = obtenerErrores();
    mostrarErrores(errores);

    if (Object.keys(errores).length > 0) {
        // Hay errores — hacer scroll al primer campo con error
        var primerError = document.querySelector('.input-error');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // ——— Sin errores: construir objeto servicio ———
    var nombre      = document.getElementById('nombre').value.trim();
    var descripcion = document.getElementById('descripcion').value.trim();
    var precio      = Number(document.getElementById('precio').value.trim());
    var imagen      = document.getElementById('imagen').value.trim() || 'img/default_service.png';

    var nuevoServicio = {
        nombre:      nombre,
        descripcion: descripcion,
        precio:      precio,
        imagen:      imagen
    };

    guardarServicio(nuevoServicio);

    // Mostrar mensaje de éxito y deshabilitar botón
    var successMsg = document.getElementById('success-msg');
    successMsg.style.display = 'block';

    var submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Guardado';
    submitBtn.style.opacity = '0.7';

    // Redirigir a la página principal (sección servicios) tras 1.5 s
    setTimeout(function () {
        window.location.href = 'index.html#servicios';
    }, 1500);
}

// ============================================
// 7. PERSISTENCIA — localStorage
// ============================================

/**
 * Lee los servicios extra ya guardados, agrega el nuevo
 * y vuelve a almacenar el array actualizado.
 */
function guardarServicio(servicio) {
    var existentes = [];

    try {
        var stored = localStorage.getItem('servicios_extra');
        if (stored) {
            existentes = JSON.parse(stored);
        }
    } catch (e) {
        existentes = [];
    }

    existentes.push(servicio);
    localStorage.setItem('servicios_extra', JSON.stringify(existentes));
}
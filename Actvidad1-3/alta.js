var STORAGE_KEY = 'syscode_servicios_extra';
var getExtras  = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
var saveExtras = arr => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
var IMG_DEFAULT = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80";

var rules = {
    nombre: function(v) {
        if (!v.trim())             return 'El nombre es obligatorio.';
        if (v.trim().length < 3)   return 'Mínimo 3 caracteres.';
        if (v.trim().length > 100) return 'Máximo 100 caracteres.';
        return null;
    },
    descripcion: function(v) {
        if (!v.trim())             return 'La descripción es obligatoria.';
        if (v.trim().length < 20)  return 'Mínimo 20 caracteres.';
        if (v.trim().length > 500) return 'Máximo 500 caracteres.';
        return null;
    },
    precio: function(v) {
        if (v === '' || v === null) return 'El precio es obligatorio.';
        var n = parseFloat(v);
        if (isNaN(n) || n <= 0)    return 'Debe ser un número positivo mayor a 0.';
        return null;
    },
    imagen: function(v) {
        if (!v.trim()) return null;
        try {
            var u = new URL(v.trim());
            if (!['http:', 'https:'].includes(u.protocol)) throw 0;
            return null;
        } catch(e) {
            return 'URL no válida. Debe comenzar con http:// o https://';
        }
    }
};

function checkField(name) {
    var $el  = $('#alta-' + name);
    var val  = $el.val();
    var err  = rules[name] ? rules[name](val) : null;
    var $err = $('#alta-error-' + name);

    $el.toggleClass('alta-is-error', !!err)
       .toggleClass('alta-is-ok', !err && val.trim() !== '');

    if (err) {
        $el.removeClass('animate__animated animate__shakeX');
        setTimeout(function() {
            $el.addClass('animate__animated animate__shakeX');
        }, 10);
    }

    $err.text(err || '').css('opacity', err ? 1 : 0);
    return err;
}

function showToast(msg, type) {
    var $toast = $('<div>')
        .addClass('alta-toast alta-toast-' + (type || 'success'))
        .addClass('animate__animated animate__fadeInRight')
        .text(msg);
    $('#alta-toast-wrap').append($toast);
    setTimeout(function() {
        $toast.removeClass('animate__fadeInRight').addClass('animate__fadeOutRight');
        $toast.one('animationend', function() { $toast.remove(); });
    }, 3000);
}
function renderAlta() {
    var $root = $('#app-alta');
    /* HEADER */
    var $header = $('<header>').addClass('site-header')
        .append(
            $('<div>').addClass('header-inner')
                .append(
                    $('<a>').addClass('logo').attr('href', 'index.html')
                        .append($('<div>').addClass('logo-icon').text('⟨/⟩'))
                        .append($('<span>').text('Soluciones Informáticas'))
                )
                .append(
                    $('<a>').addClass('alta-back-btn').attr('href', '#')
                        .text('← Volver a Servicios')
                        .on('click', function(e) {
                            e.preventDefault();
                            sessionStorage.setItem('syscode_nav_destino', 'servicios');
                            window.location.href = 'index.html';
                        })
                )
        );

    /* MAIN */
    var $main = $('<main>').addClass('alta-main');
    var $wrap = $('<div>').addClass('alta-wrap');

    /* Hero */
    var $hero = $('<div>').addClass('alta-hero animate__animated animate__fadeInDown')
        .append($('<span>').addClass('section-tag').text('Catálogo'))
        .append($('<h1>').addClass('alta-hero-title').text('Agregar Nuevo Servicio'))
        .append($('<p>').addClass('alta-hero-sub')
            .text('Completa el formulario para registrar un nuevo servicio en el catálogo.'));

    /* Resumen errores */
    var $summary = $('<div>').addClass('alta-error-summary').attr('id', 'alta-error-summary')
        .append($('<strong>').text('⚠ Corrige los siguientes campos:'))
        .append($('<ul>').attr('id', 'alta-error-list'));

    /* Tarjeta */
    var $card = $('<div>').addClass('alta-card animate__animated animate__fadeInUp');
    var $form = $('<form>').attr({ id: 'alta-form', novalidate: true });

    /* Nombre */
    $form.append(crearCampo({
        name: 'nombre', label: 'Nombre del Servicio', required: true,
        type: 'text', placeholder: 'Ej. Desarrollo Web Full-Stack',
        maxlength: 100, hint: 'Entre 3 y 100 caracteres.', contador: true
    }));

    /* Descripción */
    $form.append(crearTextarea({
        name: 'descripcion', label: 'Descripción', required: true,
        placeholder: 'Describe el servicio de forma clara y detallada...',
        maxlength: 500, hint: 'Entre 20 y 500 caracteres.', contador: true
    }));

    /* Precio */
    $form.append(crearCampo({
        name: 'precio', label: 'Precio (MXN)', required: true,
        type: 'number', placeholder: 'Ej. 1500',
        min: '0.01', step: '0.01',
        hint: 'Número positivo mayor a 0. Máximo 2 decimales.'
    }));

    /* Imagen */
    $form.append(crearCampo({
        name: 'imagen', label: 'URL de Imagen', required: false,
        type: 'url', placeholder: 'https://ejemplo.com/imagen.png (opcional)',
        hint: 'Opcional. URL válida que comience con http:// o https://'
    }));

    /* Botón */
    $form.append(
        $('<div>').addClass('alta-submit-wrap')
            .append(
                $('<button>').attr('type', 'submit')
                    .addClass('btn-alta-submit')
                    .html('Agregar Servicio &nbsp;→')
            )
    );

    $card.append($form);
    $wrap.append($hero, $summary, $card);
    $main.append($wrap);

    /* Footer */
    var $footer = $('<footer>').addClass('site-footer')
        .append($('<div>').addClass('footer-inner')
            .append($('<p>').text('© 2026 SysCode Solutions — Ingeniería en Sistemas Computacionales')));

    /* Toast wrap */
    var $toastWrap = $('<div>').attr('id', 'alta-toast-wrap').addClass('alta-toast-wrap');

    $root.empty().append($header, $main, $footer, $toastWrap);

    bindEventos();
}

/* ── Helpers de construcción ── */
function crearCampo(opts) {
    var $group = $('<div>').addClass('alta-field-group');

    var $label = $('<label>').addClass('alta-label').attr('for', 'alta-' + opts.name)
        .html(opts.label + (opts.required ? ' <span class="alta-req">*</span>' : ''));

    var $input = $('<input>').attr({
        type:         opts.type || 'text',
        id:           'alta-' + opts.name,
        placeholder:  opts.placeholder || '',
        autocomplete: 'off'
    }).addClass('alta-input');

    if (opts.maxlength) $input.attr('maxlength', opts.maxlength);
    if (opts.min)       $input.attr('min', opts.min);
    if (opts.step)      $input.attr('step', opts.step);

    $group.append($label, $input);

    if (opts.contador) {
        var max = opts.maxlength || 100;
        $group.append(
            $('<div>').addClass('alta-char-counter').attr('id', 'alta-counter-' + opts.name).text('0 / ' + max)
        );
    }

    if (opts.hint) {
        $group.append($('<p>').addClass('alta-hint').text(opts.hint));
    }

    $group.append($('<div>').addClass('alta-error-msg').attr('id', 'alta-error-' + opts.name));
    return $group;
}
function crearTextarea(opts) {
    var $group = $('<div>').addClass('alta-field-group');
    var $label = $('<label>').addClass('alta-label').attr('for', 'alta-' + opts.name)
        .html(opts.label + (opts.required ? ' <span class="alta-req">*</span>' : ''));
    var $ta = $('<textarea>').attr({
        id:          'alta-' + opts.name,
        placeholder: opts.placeholder || '',
        maxlength:   opts.maxlength || 500,
        rows:        4
    }).addClass('alta-input alta-textarea');
    $group.append($label, $ta);
    if (opts.contador) {
        var max = opts.maxlength || 500;
        $group.append(
            $('<div>').addClass('alta-char-counter').attr('id', 'alta-counter-' + opts.name).text('0 / ' + max)
        );
    }

    if (opts.hint) {
        $group.append($('<p>').addClass('alta-hint').text(opts.hint));
    }

    $group.append($('<div>').addClass('alta-error-msg').attr('id', 'alta-error-' + opts.name));
    return $group;
}
function bindEventos() {

    /* Validación en tiempo real */
    ['nombre', 'descripcion', 'precio', 'imagen'].forEach(function(name) {
        $('#alta-' + name)
            .on('blur', function() { checkField(name); })
            .on('input change', function() {
                if ($('#alta-' + name).hasClass('alta-is-error')) {
                    checkField(name);
                }
            });
    });
    ['nombre', 'descripcion'].forEach(function(name) {
        var $counter = $('#alta-counter-' + name);
        if (!$counter.length) return;
        var max = parseInt($('#alta-' + name).attr('maxlength') || 500);
        $('#alta-' + name).on('input', function() {
            var len = $(this).val().length;
            $counter.text(len + ' / ' + max)
                    .toggleClass('alta-char-warn', len >= Math.floor(max * 0.85));
        });
    });

    $('#alta-form').on('submit', function(e) {
        e.preventDefault();

        /* Validar todos los campos */
        var errores = ['nombre', 'descripcion', 'precio', 'imagen']
            .map(function(name) { return { name: name, err: checkField(name) }; })
            .filter(function(x) { return x.err !== null; });

        if (errores.length > 0) {
            $('#alta-error-list').html(
                errores.map(function(x) {
                    return '<li><strong>' + x.name + ':</strong> ' + x.err + '</li>';
                }).join('')
            );
            $('#alta-error-summary').addClass('alta-summary-visible animate__animated animate__fadeInDown');
            $('html, body').animate({
                scrollTop: $('#alta-error-summary').offset().top - 100
            }, 400);
            $('#alta-' + errores[0].name).trigger('focus');
            showToast('Revisa los campos marcados.', 'error');
            return;
        }

        /* Sin errores — guardar */
        $('#alta-error-summary').removeClass('alta-summary-visible');

        var nuevo = {
            id:          Date.now().toString(),
            nombre:      $('#alta-nombre').val().trim(),
            descripcion: $('#alta-descripcion').val().trim(),
            precio:      parseFloat($('#alta-precio').val()),
            imagen:      $('#alta-imagen').val().trim() || IMG_DEFAULT,
            fechaAlta:   new Date().toISOString(),
            esNuevo:     true
        };
        var extras = getExtras();
        extras.push(nuevo);
        saveExtras(extras)
        sessionStorage.setItem('syscode_just_added', nuevo.nombre);
        sessionStorage.setItem('syscode_nav_destino', 'servicios');
        showToast('✓ "' + nuevo.nombre + '" guardado. Redirigiendo...', 'success');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    });
}
$(function() {
    renderAlta();
});
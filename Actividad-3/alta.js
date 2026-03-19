/* alta.js — Formulario de Alta | Bootstrap 5 + jQuery */
$(function () {

  var getProducts  = () => JSON.parse(localStorage.getItem('stockr_products') || '[]');
  var saveProducts = p  => localStorage.setItem('stockr_products', JSON.stringify(p));
  var formatPrice  = v  => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(+v || 0);
  var $f           = name => $('#' + name);

  /* ── Validaciones — retornan string de error o null ── */
  var rules = {
    nombre(v) {
      if (!v.trim())           return 'El nombre es obligatorio.';
      if (v.trim().length < 3) return 'Mínimo 3 caracteres.';
      if (v.trim().length > 80)return 'Máximo 80 caracteres.';
    },
    categoria(v) { if (!v) return 'Selecciona una categoría.'; },
    precio(v) {
      if (v === '') return 'El precio es obligatorio.';
      if (+v <= 0)  return 'Debe ser mayor a $0.00.';
    },
    stock(v) {
      if (v === '')        return 'El stock es obligatorio.';
      if (+v < 0)          return 'No puede ser negativo.';
      if (!Number.isInteger(+v)) return 'Debe ser un número entero.';
    },
    sku(v) {
      if (!v.trim())            return 'El SKU es obligatorio.';
      if (v.trim().length < 4)  return 'Mínimo 4 caracteres.';
      if (!/^[A-Za-z0-9-]+$/.test(v.trim())) return 'Solo letras, números y guiones.';
      if (getProducts().some(p => p.sku.toLowerCase() === v.trim().toLowerCase()))
        return `El SKU "${v.trim()}" ya existe.`;
    },
    imagen(v) {
      if (!v.trim()) return null;
      try { var u = new URL(v); if (!['http:','https:'].includes(u.protocol)) throw 0; }
      catch { return 'URL no válida (debe iniciar con https://).'; }
    }
  };

  /* ── Mostrar / quitar error en campo ── */
  function check(name) {
    var val = $f(name).val();
    var err = rules[name] ? rules[name](val) : null;
    $f(name).toggleClass('is-bad', !!err).toggleClass('is-ok', !err && !!val);
    $('#error-' + name).text(err || '');
    return err || null;
  }

  /* ── Live preview ── */
  function preview() {
    $('#preview-name').text($f('nombre').val()      || 'Nombre del producto');
    $('#preview-cat').text($f('categoria').val()    || 'Categoría');
    $('#preview-desc').text($f('descripcion').val() || 'Descripción del producto...');
    $('#preview-price').text(formatPrice($f('precio').val()));
    $('#preview-stock').text(($f('stock').val() || '0') + ' uds.');
    $('#preview-sku').text($f('sku').val() ? 'SKU: ' + $f('sku').val().toUpperCase() : 'SKU: —');

    var url = $f('imagen').val().trim();
    $('#preview-img').toggleClass('d-none', !url).attr('src', url || '');
    $('#preview-placeholder').toggle(!url);
  }

  /* ── Eventos en todos los campos ── */
  ['nombre','categoria','precio','stock','sku','imagen','descripcion'].forEach(name => {
    $f(name).on('blur', () => check(name)).on('input change', preview);
  });

  /* Contador de caracteres */
  $f('descripcion').on('input', () => $('#char-count').text($f('descripcion').val().length));

  /* Preview imagen en formulario */
  $f('imagen').on('input', function () {
    var url = $(this).val().trim();
    $('#img-preview').toggleClass('d-none', !url || !!rules.imagen(url)).attr('src', url);
  });

  /* ── Reset ── */
  $('#btn-reset').on('click', function () {
    $('#alta-form')[0].reset();
    ['nombre','categoria','precio','stock','sku','imagen'].forEach(name => {
      $f(name).removeClass('is-bad is-ok');
      $('#error-' + name).text('');
    });
    $('#error-summary, #alert-wrap').addClass('d-none').html('');
    $('#alert-wrap').empty();
    $('#char-count').text('0');
    $('#img-preview').addClass('d-none');
    preview();
  });

  /* ── Submit ── */
  $('#alta-form').on('submit', function (e) {
    e.preventDefault();

    var errors = ['nombre','categoria','precio','stock','sku','imagen']
      .map(name => ({ name, err: check(name) }))
      .filter(x => x.err);

    if (errors.length) {
      $('#error-list').html(errors.map(x => `<li><strong>${x.name}:</strong> ${x.err}</li>`).join(''));
      $('#error-summary').removeClass('d-none');
      $('#alert-wrap').html(`
        <div class="alert alert-danger alert-dismissible fade show">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Se encontraron ${errors.length} error(es). Revisa los campos marcados.
          <button class="btn-close" data-bs-dismiss="alert"></button>
        </div>`);
      $f(errors[0].name).focus();
      return;
    }

    var product = {
      id: Date.now().toString(),
      nombre:      $f('nombre').val().trim(),
      categoria:   $f('categoria').val(),
      precio:      +$f('precio').val(),
      stock:       +$f('stock').val(),
      sku:         $f('sku').val().trim().toUpperCase(),
      descripcion: $f('descripcion').val().trim(),
      imagen:      $f('imagen').val().trim(),
      fechaAlta:   new Date().toISOString()
    };

    var products = getProducts();
    products.push(product);
    saveProducts(products);
    sessionStorage.setItem('stockr_just_added', product.nombre);

    $('#error-summary').addClass('d-none');
    $('#alert-wrap').html(`
      <div class="alert alert-success">
        <i class="bi bi-check-circle-fill me-2"></i>
        "${product.nombre}" guardado. Redirigiendo...
      </div>`);

    setTimeout(() => window.location.href = 'index.html', 1800);
  });

  preview();
});

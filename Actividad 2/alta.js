/* ============================================================
   alta.js — Formulario de Alta de Producto
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Referencias DOM ── */
  const form         = document.getElementById('alta-form');
  const notification = document.getElementById('notification');
  const errorSummary = document.getElementById('error-summary');
  const errorList    = document.getElementById('error-list');
  const btnReset     = document.getElementById('btn-reset');

  /* Campos */
  const fields = {
    nombre:      document.getElementById('nombre'),
    categoria:   document.getElementById('categoria'),
    precio:      document.getElementById('precio'),
    stock:       document.getElementById('stock'),
    sku:         document.getElementById('sku'),
    descripcion: document.getElementById('descripcion'),
    imagen:      document.getElementById('imagen'),
  };

  /* Preview */
  const previewName  = document.getElementById('preview-name');
  const previewCat   = document.getElementById('preview-cat');
  const previewDesc  = document.getElementById('preview-desc');
  const previewPrice = document.getElementById('preview-price');
  const previewStock = document.getElementById('preview-stock');
  const previewSku   = document.getElementById('preview-sku');
  const previewImg   = document.getElementById('preview-img');
  const previewImgPh = document.getElementById('preview-img-placeholder');
  const charCount    = document.getElementById('char-count');
  const imgPreviewWrap = document.getElementById('img-preview-wrap');
  const imgPreview     = document.getElementById('img-preview');

  /* ── Helper: leer productos de localStorage ── */
  function getProducts() {
    const raw = localStorage.getItem('stockr_products');
    return raw ? JSON.parse(raw) : [];
  }

  /* ── Helper: guardar productos en localStorage ── */
  function saveProducts(products) {
    localStorage.setItem('stockr_products', JSON.stringify(products));
  }

  /* ── Helper: formato de precio ── */
  function formatPrice(val) {
    const n = parseFloat(val);
    if (isNaN(n)) return '$0.00';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
  }

  /* ── Mostrar / ocultar error en campo ── */
  function setFieldError(name, message) {
    const input     = fields[name];
    const errorSpan = document.getElementById(`error-${name}`);
    const group     = document.getElementById(`group-${name}`);
    if (message) {
      input.classList.add('is-error');
      input.classList.remove('is-ok');
      if (errorSpan) errorSpan.textContent = message;
      if (group) group.setAttribute('data-error', '1');
    } else {
      input.classList.remove('is-error');
      input.classList.add('is-ok');
      if (errorSpan) errorSpan.textContent = '';
      if (group) group.removeAttribute('data-error');
    }
  }

  /* ── Mostrar notification banner ── */
  function showNotification(message, type) {
    notification.textContent = message;
    notification.className   = `notification ${type}`;
    notification.classList.remove('hidden');
    notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
      setTimeout(() => notification.classList.add('hidden'), 4000);
    }
  }

  /* ── Mostrar resumen de errores ── */
  function showErrorSummary(errors) {
    if (errors.length === 0) {
      errorSummary.classList.add('hidden');
      return;
    }
    errorList.innerHTML = '';
    errors.forEach(({ field, message, suggestion }) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${field}:</strong> ${message}${suggestion ? ` — <em>Sugerencia: ${suggestion}</em>` : ''}`;
      errorList.appendChild(li);
    });
    errorSummary.classList.remove('hidden');
    errorSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ================================================================
     VALIDACIONES INDIVIDUALES
     Cada función retorna null (ok) o un objeto { message, suggestion }
     ================================================================ */

  function validateNombre(value) {
    if (!value.trim()) {
      return { message: 'El nombre es obligatorio.', suggestion: 'Escribe un nombre descriptivo, ej. "Laptop Dell XPS 13".' };
    }
    if (value.trim().length < 3) {
      return { message: 'El nombre es demasiado corto (mín. 3 caracteres).', suggestion: 'Usa el nombre completo del producto.' };
    }
    if (value.trim().length > 80) {
      return { message: 'El nombre excede 80 caracteres.', suggestion: 'Abrevia sin perder claridad.' };
    }
    return null;
  }

  function validateCategoria(value) {
    if (!value) {
      return { message: 'Debes seleccionar una categoría.', suggestion: 'Elige la categoría más cercana al producto.' };
    }
    return null;
  }

  function validatePrecio(value) {
    if (value === '' || value === null) {
      return { message: 'El precio es obligatorio.', suggestion: 'Ingresa el precio sin el símbolo $, ej. 199.99' };
    }
    const n = parseFloat(value);
    if (isNaN(n)) {
      return { message: 'El precio debe ser un número.', suggestion: 'Usa punto decimal, ej. 49.99' };
    }
    if (n <= 0) {
      return { message: 'El precio debe ser mayor a $0.00.', suggestion: 'Si el producto es gratuito, ingresa 0.01 como valor mínimo.' };
    }
    if (n > 9_999_999) {
      return { message: 'El precio parece demasiado alto.', suggestion: 'Verifica el valor ingresado.' };
    }
    return null;
  }

  function validateStock(value) {
    if (value === '' || value === null) {
      return { message: 'El stock es obligatorio.', suggestion: 'Ingresa 0 si aún no hay inventario.' };
    }
    const n = parseInt(value, 10);
    if (isNaN(n) || !Number.isInteger(n)) {
      return { message: 'El stock debe ser un número entero.', suggestion: 'No uses decimales; ej. 10, 50, 200.' };
    }
    if (n < 0) {
      return { message: 'El stock no puede ser negativo.', suggestion: 'Ingresa 0 si no hay existencias.' };
    }
    if (n > 999_999) {
      return { message: 'El stock ingresado es demasiado alto.', suggestion: 'Verifica la cantidad.' };
    }
    return null;
  }

  function validateSku(value) {
    if (!value.trim()) {
      return { message: 'El SKU es obligatorio.', suggestion: 'Crea un código único, ej. ELEC-001 o ROPA-XL-002.' };
    }
    if (value.trim().length < 4) {
      return { message: 'El SKU debe tener al menos 4 caracteres.', suggestion: 'Usa un formato como CAT-NNN, ej. ELEC-001.' };
    }
    if (!/^[A-Za-z0-9\-]+$/.test(value.trim())) {
      return { message: 'El SKU solo puede contener letras, números y guiones.', suggestion: 'Elimina espacios o caracteres especiales.' };
    }
    // Verificar duplicado
    const products = getProducts();
    const duplicate = products.find(p => p.sku.toLowerCase() === value.trim().toLowerCase());
    if (duplicate) {
      return { message: `El SKU "${value.trim()}" ya existe.`, suggestion: 'Usa un código diferente, ej. agrega un sufijo como -2 o -B.' };
    }
    return null;
  }

  function validateImagen(value) {
    if (!value.trim()) return null; // opcional
    try {
      const url = new URL(value.trim());
      if (!['http:', 'https:'].includes(url.protocol)) {
        return { message: 'La URL debe comenzar con http:// o https://', suggestion: 'Copia la URL directa de la imagen desde el navegador.' };
      }
    } catch {
      return { message: 'La URL de imagen no es válida.', suggestion: 'Pega la URL completa, ej. https://ejemplo.com/img.jpg' };
    }
    return null;
  }

  /* ── Validar un campo y actualizar UI ── */
  function validateField(name) {
    const value = fields[name].value;
    let error = null;
    switch (name) {
      case 'nombre':    error = validateNombre(value);    break;
      case 'categoria': error = validateCategoria(value); break;
      case 'precio':    error = validatePrecio(value);    break;
      case 'stock':     error = validateStock(value);     break;
      case 'sku':       error = validateSku(value);       break;
      case 'imagen':    error = validateImagen(value);    break;
      default: error = null;
    }
    if (error) {
      setFieldError(name, error.message);
    } else {
      setFieldError(name, null);
    }
    return error;
  }

  /* ── Validar todo el formulario ── */
  function validateAll() {
    const requiredFields = ['nombre', 'categoria', 'precio', 'stock', 'sku'];
    const errors = [];

    requiredFields.forEach(name => {
      const error = validateField(name);
      if (error) {
        const labelMap = {
          nombre:    'Nombre',
          categoria: 'Categoría',
          precio:    'Precio',
          stock:     'Stock',
          sku:       'SKU',
        };
        errors.push({ field: labelMap[name], ...error });
      }
    });

    // Imagen (opcional, pero si tiene valor, validar)
    if (fields.imagen.value.trim()) {
      const error = validateField('imagen');
      if (error) {
        errors.push({ field: 'Imagen URL', ...error });
      }
    }

    return errors;
  }

  /* ── Live preview ── */
  function updatePreview() {
    previewName.textContent  = fields.nombre.value.trim()      || 'Nombre del producto';
    previewCat.textContent   = fields.categoria.value          || 'Categoría';
    previewDesc.textContent  = fields.descripcion.value.trim() || 'Descripción del producto...';
    previewPrice.textContent = formatPrice(fields.precio.value);
    previewStock.textContent = fields.stock.value !== '' ? `${fields.stock.value} uds.` : '0 uds.';
    previewSku.textContent   = fields.sku.value.trim() ? `SKU: ${fields.sku.value.trim()}` : 'SKU: —';

    const imgUrl = fields.imagen.value.trim();
    if (imgUrl) {
      previewImg.src = imgUrl;
      previewImg.classList.remove('hidden');
      previewImgPh.classList.add('hidden');
    } else {
      previewImg.src = '';
      previewImg.classList.add('hidden');
      previewImgPh.classList.remove('hidden');
    }
  }

  /* ── Contador de caracteres de descripción ── */
  fields.descripcion.addEventListener('input', () => {
    charCount.textContent = fields.descripcion.value.length;
    updatePreview();
  });

  /* ── Preview de imagen en el formulario ── */
  fields.imagen.addEventListener('input', () => {
    const url = fields.imagen.value.trim();
    if (url && validateImagen(url) === null) {
      imgPreview.src = url;
      imgPreviewWrap.classList.remove('hidden');
      imgPreview.onerror = () => imgPreviewWrap.classList.add('hidden');
    } else {
      imgPreviewWrap.classList.add('hidden');
    }
    updatePreview();
  });

  /* ── Validación en tiempo real (blur) ── */
  Object.keys(fields).forEach(name => {
    fields[name].addEventListener('blur', () => {
      if (['nombre','categoria','precio','stock','sku','imagen'].includes(name)) {
        validateField(name);
      }
      updatePreview();
    });
    fields[name].addEventListener('input', updatePreview);
    fields[name].addEventListener('change', updatePreview);
  });

  /* ── Resetear formulario ── */
  btnReset.addEventListener('click', () => {
    form.reset();
    Object.keys(fields).forEach(name => {
      const input     = fields[name];
      const errorSpan = document.getElementById(`error-${name}`);
      input.classList.remove('is-error', 'is-ok');
      if (errorSpan) errorSpan.textContent = '';
    });
    errorSummary.classList.add('hidden');
    notification.classList.add('hidden');
    imgPreviewWrap.classList.add('hidden');
    charCount.textContent = '0';
    updatePreview();
  });

  /* ── Submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = validateAll();

    if (errors.length > 0) {
      showErrorSummary(errors);
      showNotification(
        `⚠ Se encontraron ${errors.length} error(es). Revisa el resumen y corrige los campos marcados.`,
        'error'
      );
      // Hacer foco en el primer campo con error
      const firstErrorField = Object.keys(fields).find(
        name => fields[name].classList.contains('is-error')
      );
      if (firstErrorField) fields[firstErrorField].focus();
      return;
    }

    /* ── Construir objeto producto ── */
    const newProduct = {
      id:          Date.now().toString(),
      nombre:      fields.nombre.value.trim(),
      categoria:   fields.categoria.value,
      precio:      parseFloat(fields.precio.value),
      stock:       parseInt(fields.stock.value, 10),
      sku:         fields.sku.value.trim().toUpperCase(),
      descripcion: fields.descripcion.value.trim(),
      imagen:      fields.imagen.value.trim(),
      fechaAlta:   new Date().toISOString(),
    };

    /* ── Guardar en localStorage ── */
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    /* ── Marcar para toast en index ── */
    sessionStorage.setItem('stockr_just_added', newProduct.nombre);

    /* ── Feedback y redirección ── */
    showNotification(
      `✓ Producto "${newProduct.nombre}" guardado exitosamente. Redirigiendo...`,
      'success'
    );
    errorSummary.classList.add('hidden');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1800);
  });

  /* ── Inicializar preview ── */
  updatePreview();
});

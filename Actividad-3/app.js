/* app.js — Catálogo | Bootstrap 5 + jQuery */
$(function () {

  var getProducts = () => JSON.parse(localStorage.getItem('stockr_products') || '[]');

  var formatPrice = v => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v);

  function cardHtml(p, i) {
    var s    = +p.stock;
    var cls  = s === 0 ? 'out' : s <= 5 ? 'low' : '';
    var lbl  = s === 0 ? 'Sin stock' : s + ' uds.';
    var img  = p.imagen
      ? `<img class="card-img-fit" src="${p.imagen}" alt="${p.nombre}" onerror="$(this).replaceWith('📦')">`
      : '📦';

    return `
      <div class="col-sm-6 col-lg-4" style="animation-delay:${i * .05}s">
        <div class="card product-card border-0 h-100">
          <div class="card-img-wrap">${img}</div>
          <div class="card-body d-flex flex-column gap-1 p-3">
            <span class="card-cat">${p.categoria}</span>
            <h2 class="card-name fs-6 mb-0">${p.nombre}</h2>
            <p class="text-muted small flex-grow-1 mb-0"
               style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
              ${p.descripcion || 'Sin descripción.'}
            </p>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <span class="card-price">${formatPrice(p.precio)}</span>
              <span class="card-stock ${cls}">${lbl}</span>
            </div>
            <span class="card-sku">SKU: ${p.sku}</span>
          </div>
        </div>
      </div>`;
  }

  function render(filter) {
    var products = getProducts();
    var term     = (filter || '').toLowerCase().trim();
    var list     = term
      ? products.filter(p => [p.nombre, p.categoria, p.sku].some(v => v.toLowerCase().includes(term)))
      : products;

    $('#product-count').text(products.length);
    $('#empty-state').toggleClass('d-none', list.length > 0);
    $('#product-grid').html(list.map(cardHtml).join(''));
  }

  $('#search-input').on('input', function () { render($(this).val()); });
  render();

  /* Toast al volver de alta */
  var added = sessionStorage.getItem('stockr_just_added');
  if (added) {
    sessionStorage.removeItem('stockr_just_added');
    var $t = $(`
      <div class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">✓ "${added}" agregado correctamente.</div>
          <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`).appendTo('#toast-wrap');
    new bootstrap.Toast($t[0], { delay: 4000 }).show();
    $t[0].addEventListener('hidden.bs.toast', () => $t.remove());
  }
});

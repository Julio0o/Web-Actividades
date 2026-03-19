/* ============================================================
   app.js — Página de Servicios / Índice
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const productGrid  = document.getElementById('product-grid');
  const emptyState   = document.getElementById('empty-state');
  const productCount = document.getElementById('product-count');
  const searchInput  = document.getElementById('search-input');

  /* ── Cargar productos de localStorage ── */
  function getProducts() {
    const raw = localStorage.getItem('stockr_products');
    return raw ? JSON.parse(raw) : [];
  }

  /* ── Formato de precio ── */
  function formatPrice(value) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  }

  /* ── Badge de stock ── */
  function stockClass(stock) {
    if (stock === 0)  return 'out';
    if (stock <= 5)   return 'low';
    return '';
  }

  function stockLabel(stock) {
    if (stock === 0) return 'Sin stock';
    return `${stock} uds.`;
  }

  /* ── Crear tarjeta de producto ── */
  function createCard(product, index) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.05}s`;

    const imgContent = product.imagen
      ? `<img class="card-img" src="${product.imagen}" alt="${product.nombre}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><div style="display:none;align-items:center;justify-content:center;font-size:3.5rem;width:100%;height:100%">📦</div>`
      : '📦';

    const cls = stockClass(Number(product.stock));

    card.innerHTML = `
      <div class="card-img-wrap">${imgContent}</div>
      <div class="card-body">
        <span class="card-cat">${product.categoria}</span>
        <h2 class="card-name">${product.nombre}</h2>
        <p class="card-desc">${product.descripcion || 'Sin descripción.'}</p>
        <div class="card-footer">
          <span class="card-price">${formatPrice(product.precio)}</span>
          <span class="card-stock ${cls}">${stockLabel(Number(product.stock))}</span>
        </div>
        <span class="card-sku">SKU: ${product.sku}</span>
      </div>
    `;
    return card;
  }

  /* ── Renderizar lista filtrada ── */
  function render(filter = '') {
    const products = getProducts();
    const term     = filter.toLowerCase().trim();

    const filtered = term
      ? products.filter(p =>
          p.nombre.toLowerCase().includes(term) ||
          p.categoria.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term)
        )
      : products;

    productGrid.innerHTML = '';
    productCount.textContent = products.length;

    if (filtered.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      filtered.forEach((product, i) => {
        productGrid.appendChild(createCard(product, i));
      });
    }
  }

  /* ── Búsqueda en tiempo real ── */
  searchInput.addEventListener('input', () => {
    render(searchInput.value);
  });

  /* ── Inicializar ── */
  render();

  /* ── Mostrar toast si volvió de alta ── */
  const justAdded = sessionStorage.getItem('stockr_just_added');
  if (justAdded) {
    sessionStorage.removeItem('stockr_just_added');
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 2rem; right: 2rem;
      background: #1a7a4a; color: #fff;
      font-family: 'DM Mono', monospace; font-size: .85rem;
      padding: .9rem 1.4rem; border-radius: 4px;
      box-shadow: 0 4px 20px rgba(0,0,0,.2);
      z-index: 9999; animation: fadeUp .3s ease both;
    `;
    toast.textContent = `✓ "${justAdded}" agregado correctamente.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
});

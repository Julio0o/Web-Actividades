/**
 * SysCore — main.js (Actividad 3)
 * Construcción completa del DOM con document.createElement() y element.appendChild()
 * Sin librerías ni frameworks
 * Incluye formulario de contacto con envío a PostgreSQL vía Django
 */

// ─── DATOS ───────────────────────────────────────────────────────────────────

var NAV_ITEMS = [
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Tecnología', href: '#tech' },
  { label: 'Equipo', href: '#team' },
  { label: 'Contacto', href: '#contact' },
];

var SERVICES_LOCAL = [
  { icon: '⚙️', name: 'Desarrollo de Software', desc: 'Diseño y construcción de aplicaciones robustas.', tags: ['Backend','APIs REST'], color: '#00e5ff' },
  { icon: '🏗️', name: 'Arquitectura de Sistemas', desc: 'Definición de arquitecturas de alto nivel.', tags: ['Distributed','DDD'], color: '#a78bfa' },
  { icon: '🔐', name: 'Ciberseguridad', desc: 'Auditorías de seguridad y hardening.', tags: ['Pentest','OWASP'], color: '#f43f5e' },
  { icon: '☁️', name: 'Cloud & DevOps', desc: 'Migración y gestión cloud.', tags: ['AWS','Kubernetes'], color: '#fb923c' },
  { icon: '🤖', name: 'Inteligencia Artificial', desc: 'Implementación de modelos de ML.', tags: ['ML Ops','NLP'], color: '#34d399' },
  { icon: '📊', name: 'Consultoría Técnica', desc: 'Acompañamiento estratégico.', tags: ['Tech Audit','Roadmap'], color: '#fbbf24' },
];

var STATS = [
  { num: '120+', label: 'Proyectos entregados' },
  { num: '98%', label: 'Clientes satisfechos' },
  { num: '15+', label: 'Años de experiencia' },
  { num: '40+', label: 'Especialistas activos' },
];

var TECH_STACK = [
  { icon: '🐍', name: 'Python' },
  { icon: '☕', name: 'Java' },
  { icon: '⚡', name: 'Go' },
  { icon: '🦀', name: 'Rust' },
  { icon: '🐘', name: 'PostgreSQL' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '🐳', name: 'Docker' },
  { icon: '☁️', name: 'AWS' },
  { icon: '🛡️', name: 'Vault' },
];

var TEAM = [
  { emoji: '👩‍💻', name: 'Alessandra Hernandez Mercado', role: 'Lead Developer', skills: ['Frontend','UI/UX','Project Management'], bg: '#1a0d1a' },
  { emoji: '👨‍💻', name: 'Julio Cesar Gutierrez Rico', role: 'Systems Engineer', skills: ['Backend','Security','Architecture'], bg: '#0d1a2e' },
];

var TERMINAL_LINES = [
  { type: 'cmd', text: 'soluciones-informaticas --status' },
  { type: 'ok', text: '✔ Todos los sistemas operativos' },
  { type: 'cmd', text: 'soluciones-informaticas --db' },
  { type: 'ok', text: '✔ PostgreSQL conectado (actividad3_db)' },
  { type: 'cmd', text: 'soluciones-informaticas --services list' },
  { type: 'out', text: '6 servicios disponibles' },
  { type: 'cmd', text: 'soluciones-informaticas --uptime' },
  { type: 'ok', text: '✔ 99.97% disponibilidad (30 días)' },
];

// ─── UTILIDAD ─────────────────────────────────────────────────────────────────

function el(tag, opts) {
  opts = opts || {};
  var elem = document.createElement(tag);
  if (opts.classes) {
    for (var i = 0; i < opts.classes.length; i++) { elem.classList.add(opts.classes[i]); }
  }
  if (opts.attrs) {
    var keys = Object.keys(opts.attrs);
    for (var i = 0; i < keys.length; i++) { elem.setAttribute(keys[i], opts.attrs[keys[i]]); }
  }
  if (opts.text !== undefined) elem.textContent = opts.text;
  if (opts.html !== undefined) elem.innerHTML = opts.html;
  return elem;
}

function getCookie(name) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i].trim();
    if (c.indexOf(name + '=') === 0) return decodeURIComponent(c.substring(name.length + 1));
  }
  return null;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function buildNavLinks() {
  var list = document.getElementById('navLinks');
  NAV_ITEMS.forEach(function (item) {
    var li = document.createElement('li');
    var a = el('a', { attrs: { href: item.href }, text: item.label });
    li.appendChild(a);
    list.appendChild(li);
  });
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function buildHero() {
  var tag = document.getElementById('heroTag');
  var dot = el('span', { html: '◆' }); dot.style.fontSize = '0.6rem';
  tag.appendChild(dot);
  tag.appendChild(el('span', { text: 'ISC · INGENIERÍA EN SISTEMAS COMPUTACIONALES' }));

  var h1 = document.getElementById('heroTitle');
  h1.appendChild(document.createTextNode('Soluciones tecnológicas '));
  h1.appendChild(el('em', { text: 'de alto nivel' }));

  document.getElementById('heroSub').textContent = 'Somos ingenieros en sistemas computacionales especializados en arquitectura, seguridad y cloud. Transformamos retos complejos en sistemas confiables.';

  var cta = document.getElementById('heroCta');
  cta.appendChild(el('a', { classes: ['btn-primary'], attrs: { href: '#services' }, text: 'Ver servicios →' }));
  cta.appendChild(el('a', { classes: ['btn-outline'], attrs: { href: '#contact' }, text: 'Contáctanos' }));

  buildTerminal();
}

function buildTerminal() {
  var wrap = document.getElementById('heroTerminal');
  var bar = el('div', { classes: ['terminal-bar'] });
  ['#ff5f57','#ffbd2e','#28c840'].forEach(function (c) {
    var d = el('div', { classes: ['t-dot'] }); d.style.background = c; bar.appendChild(d);
  });
  var title = el('span', { text: 'soluciones informaticas ~ terminal' });
  title.style.cssText = 'font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);margin-left:0.5rem;letter-spacing:1px;';
  bar.appendChild(title);
  wrap.appendChild(bar);

  var body = el('div', { classes: ['terminal-body'] });
  wrap.appendChild(body);

  var i = 0;
  function printLine() {
    if (i >= TERMINAL_LINES.length) {
      var last = el('div', { classes: ['t-line'] });
      last.appendChild(el('span', { classes: ['t-prompt'], text: '❯' }));
      last.appendChild(el('span', { classes: ['t-cursor'] }));
      body.appendChild(last);
      return;
    }
    var item = TERMINAL_LINES[i];
    var line = el('div', { classes: ['t-line'] });
    if (item.type === 'cmd') {
      line.appendChild(el('span', { classes: ['t-prompt'], text: '❯' }));
      line.appendChild(el('span', { classes: ['t-cmd'], text: item.text }));
    } else {
      var cls = item.type === 'ok' ? 't-ok' : 't-out';
      var out = el('span', { classes: [cls], text: item.text }); out.style.paddingLeft = '1.1rem';
      line.appendChild(out);
    }
    body.appendChild(line);
    i++;
    setTimeout(printLine, item.type === 'cmd' ? 600 : 300);
  }
  setTimeout(printLine, 1200);
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function buildAbout() {
  var hdr = document.getElementById('aboutHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 01. ABOUT' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Números que '));
  title.appendChild(el('span', { text: 'respaldan' }));
  title.appendChild(document.createTextNode(' nuestra experiencia'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  var grid = document.getElementById('aboutGrid');
  STATS.forEach(function (stat) {
    var card = el('div', { classes: ['about-stat', 'reveal'] });
    card.appendChild(el('span', { classes: ['stat-num'], text: stat.num }));
    card.appendChild(el('span', { classes: ['stat-label'], text: stat.label }));
    grid.appendChild(card);
  });
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function buildServices() {
  var hdr = document.getElementById('servicesHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 02. SERVICIOS' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Lo que '));
  title.appendChild(el('span', { text: 'hacemos' }));
  title.appendChild(document.createTextNode(' mejor'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  var btnGest = el('a', {
    classes: ['btn-outline'],
    attrs: { href: '/panel/', style: 'margin-top:1.5rem;display:inline-flex;' },
    text: '⚙ Gestionar servicios',
  });
  hdr.appendChild(btnGest);

  var grid = document.getElementById('servicesGrid');

  fetch('/api/servicios/')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var servicios = data.servicios;
      if (servicios.length === 0) {
        grid.appendChild(el('p', {
          text: 'No hay servicios aún. Agrégalos desde el panel.',
          attrs: { style: 'color:var(--text-muted);font-family:var(--font-mono);font-size:.82rem;grid-column:1/-1;text-align:center;padding:3rem 0;' }
        }));
        return;
      }
      servicios.forEach(function (svc, idx) { renderServiceCard(grid, svc, idx); });
      setTimeout(initReveal, 50);
    })
    .catch(function () {
      grid.appendChild(el('p', {
        text: 'Error al cargar servicios. Mostrando datos locales.',
        attrs: { style: 'color:var(--orange);font-family:var(--font-mono);font-size:.75rem;grid-column:1/-1;text-align:center;padding:1rem 0;' }
      }));
      SERVICES_LOCAL.forEach(function (svc, idx) { renderServiceCard(grid, svc, idx); });
      setTimeout(initReveal, 50);
    });
}

function renderServiceCard(grid, svc, idx) {
  var card = el('div', { classes: ['service-card', 'reveal'] });
  card.style.setProperty('--accent-color', svc.color);
  card.appendChild(el('span', { classes: ['service-index'], text: String(idx + 1).padStart(2, '0') }));
  var iconWrap = el('div', { classes: ['service-icon-wrap'] });
  iconWrap.style.background = svc.color + '18';
  iconWrap.appendChild(el('span', { classes: ['service-icon'], text: svc.icon }));
  card.appendChild(iconWrap);
  card.appendChild(el('h3', { classes: ['service-name'], text: svc.name }));
  card.appendChild(el('p', { classes: ['service-desc'], text: svc.desc }));
  var tagsWrap = el('div', { classes: ['service-tags'] });
  (svc.tags || []).forEach(function (tag) {
    var t = el('span', { classes: ['service-tag'], text: tag });
    t.style.color = svc.color; t.style.borderColor = svc.color + '30';
    tagsWrap.appendChild(t);
  });
  card.appendChild(tagsWrap);
  grid.appendChild(card);
}

// ─── TECH STACK ──────────────────────────────────────────────────────────────

function buildTech() {
  var hdr = document.getElementById('techHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 03. TECNOLOGÍA' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Nuestro '));
  title.appendChild(el('span', { text: 'stack' }));
  title.appendChild(document.createTextNode(' tecnológico'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  var track = document.getElementById('techTrack');
  var full = TECH_STACK.concat(TECH_STACK);
  full.forEach(function (item) {
    var badge = el('div', { classes: ['tech-badge'] });
    badge.appendChild(el('span', { classes: ['tech-badge-icon'], text: item.icon }));
    badge.appendChild(el('span', { text: item.name }));
    track.appendChild(badge);
  });
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

function buildTeam() {
  var hdr = document.getElementById('teamHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 04. EQUIPO' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Las personas '));
  title.appendChild(el('span', { text: 'detrás' }));
  title.appendChild(document.createTextNode(' del código'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  var grid = document.getElementById('teamGrid');
  TEAM.forEach(function (member) {
    var card = el('div', { classes: ['team-card', 'reveal'] });
    var avatar = el('div', { classes: ['team-avatar'], text: member.emoji });
    avatar.style.background = member.bg;
    card.appendChild(avatar);
    card.appendChild(el('div', { classes: ['team-name'], text: member.name }));
    card.appendChild(el('div', { classes: ['team-role'], text: member.role }));
    var skills = el('div', { classes: ['team-skills'] });
    member.skills.forEach(function (s) { skills.appendChild(el('span', { classes: ['team-skill'], text: s })); });
    card.appendChild(skills);
    grid.appendChild(card);
  });
}

// ─── CONTACT (FORMULARIO → PostgreSQL) ───────────────────────────────────────

function buildContact() {
  // Header
  var hdr = document.getElementById('contactHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 05. CONTACTO' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Solicita una '));
  title.appendChild(el('span', { text: 'cotización' }));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  var wrapper = document.getElementById('contactWrapper');
  var card = el('div', { classes: ['contact-card', 'reveal'] });

  // ── Row 1: Nombre + Email ──
  var row1 = el('div', { classes: ['contact-form-row'] });

  var grpNombre = el('div', { classes: ['contact-form-group'] });
  grpNombre.appendChild(el('label', { attrs: { for: 'c-nombre' }, text: 'Nombre completo *' }));
  grpNombre.appendChild(el('input', { attrs: { type: 'text', id: 'c-nombre', name: 'nombre', placeholder: 'Tu nombre', maxlength: '150', required: '' } }));
  row1.appendChild(grpNombre);

  var grpEmail = el('div', { classes: ['contact-form-group'] });
  grpEmail.appendChild(el('label', { attrs: { for: 'c-email' }, text: 'Email *' }));
  grpEmail.appendChild(el('input', { attrs: { type: 'email', id: 'c-email', name: 'email', placeholder: 'tu@email.com', maxlength: '254', required: '' } }));
  row1.appendChild(grpEmail);

  card.appendChild(row1);

  // ── Row 2: Teléfono + Servicio ──
  var row2 = el('div', { classes: ['contact-form-row'] });

  var grpTel = el('div', { classes: ['contact-form-group'] });
  grpTel.appendChild(el('label', { attrs: { for: 'c-telefono' }, text: 'Teléfono' }));
  grpTel.appendChild(el('input', { attrs: { type: 'text', id: 'c-telefono', name: 'telefono', placeholder: '+52 443 000 0000', maxlength: '20' } }));
  row2.appendChild(grpTel);

  var grpServ = el('div', { classes: ['contact-form-group'] });
  grpServ.appendChild(el('label', { attrs: { for: 'c-servicio' }, text: 'Servicio de interés' }));
  var select = el('select', { attrs: { id: 'c-servicio', name: 'servicio_interes' } });
  select.appendChild(el('option', { attrs: { value: '' }, text: 'Selecciona un servicio' }));
  // Se llenan dinámicamente desde la API
  row2.appendChild(grpServ);

  card.appendChild(row2);

  // ── Row 3: Mensaje ──
  var row3 = el('div', { classes: ['contact-form-row'] });
  var grpMsg = el('div', { classes: ['contact-form-group', 'full'] });
  grpMsg.appendChild(el('label', { attrs: { for: 'c-mensaje' }, text: 'Mensaje *' }));
  grpMsg.appendChild(el('textarea', { attrs: { id: 'c-mensaje', name: 'mensaje', placeholder: 'Cuéntanos sobre tu proyecto o necesidad...', rows: '4', required: '' } }));
  row3.appendChild(grpMsg);
  card.appendChild(row3);

  // ── Submit ──
  var submitRow = el('div', { classes: ['contact-submit'] });
  var btn = el('button', { classes: ['btn-primary'], attrs: { type: 'button', id: 'contactBtn' }, text: '📨 Enviar solicitud' });
  submitRow.appendChild(btn);
  card.appendChild(submitRow);

  // ── Result message ──
  var result = el('div', { classes: ['contact-result'], attrs: { id: 'contactResult' } });
  card.appendChild(result);

  // ── DB badge ──
  var badge = el('div', { classes: ['contact-db-badge'] });
  badge.appendChild(el('span', { classes: ['db-dot'] }));
  badge.appendChild(el('span', { text: 'POSTGRESQL · ALMACENAMIENTO SEGURO' }));
  card.appendChild(badge);

  wrapper.appendChild(card);

  // Cargar servicios en el select
  grpServ.appendChild(select);
  fetch('/api/servicios/')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      data.servicios.forEach(function (s) {
        select.appendChild(el('option', { attrs: { value: s.name }, text: s.icon + ' ' + s.name }));
      });
    })
    .catch(function () {
      SERVICES_LOCAL.forEach(function (s) {
        select.appendChild(el('option', { attrs: { value: s.name }, text: s.icon + ' ' + s.name }));
      });
    });

  // ── Envío del formulario ──
  btn.addEventListener('click', function () {
    // Limpiar errores previos
    var oldErrors = card.querySelectorAll('.field-error');
    for (var i = 0; i < oldErrors.length; i++) oldErrors[i].remove();
    var oldInputErr = card.querySelectorAll('.input-error');
    for (var i = 0; i < oldInputErr.length; i++) oldInputErr[i].classList.remove('input-error');
    result.className = 'contact-result';
    result.textContent = '';

    var nombre = document.getElementById('c-nombre').value.trim();
    var email = document.getElementById('c-email').value.trim();
    var telefono = document.getElementById('c-telefono').value.trim();
    var servicio = document.getElementById('c-servicio').value;
    var mensaje = document.getElementById('c-mensaje').value.trim();

    // Validación
    var valid = true;
    if (!nombre) {
      showFieldError('c-nombre', 'Este campo es obligatorio');
      valid = false;
    }
    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      showFieldError('c-email', 'Ingresa un email válido');
      valid = false;
    }
    if (!mensaje) {
      showFieldError('c-mensaje', 'Este campo es obligatorio');
      valid = false;
    }
    if (!valid) return;

    btn.disabled = true;
    btn.textContent = '⏳ Enviando...';

    var payload = JSON.stringify({
      nombre: nombre,
      email: email,
      telefono: telefono,
      servicio_interes: servicio,
      mensaje: mensaje
    });

    fetch('/api/contacto/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: payload
    })
    .then(function (r) { return r.json().then(function (d) { return { status: r.status, data: d }; }); })
    .then(function (res) {
      if (res.data.ok) {
        result.className = 'contact-result success';
        result.textContent = '✔ ' + res.data.mensaje;
        // Limpiar form
        document.getElementById('c-nombre').value = '';
        document.getElementById('c-email').value = '';
        document.getElementById('c-telefono').value = '';
        document.getElementById('c-servicio').value = '';
        document.getElementById('c-mensaje').value = '';
      } else {
        result.className = 'contact-result error';
        var errText = res.data.errores ? res.data.errores.join(' ') : (res.data.error || 'Error al enviar.');
        result.textContent = '✘ ' + errText;
      }
    })
    .catch(function () {
      result.className = 'contact-result error';
      result.textContent = '✘ Error de conexión. Intenta de nuevo.';
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = '📨 Enviar solicitud';
    });
  });
}

function showFieldError(inputId, msg) {
  var input = document.getElementById(inputId);
  input.classList.add('input-error');
  var err = el('span', { classes: ['field-error'], text: msg });
  input.parentNode.appendChild(err);
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function buildFooter() {
  var footer = document.getElementById('footer');
  var logo = el('div', { classes: ['footer-logo'] });
  logo.appendChild(el('span', { text: '[', attrs: { style: 'color:var(--text-muted)' } }));
  logo.appendChild(el('span', { text: 'SOLUCIONES ', attrs: { style: 'color:var(--text-primary)' } }));
  logo.appendChild(el('span', { text: 'INFORMÁTICAS', attrs: { style: 'color:var(--accent)' } }));
  logo.appendChild(el('span', { text: ']', attrs: { style: 'color:var(--text-muted)' } }));
  footer.appendChild(logo);

  var copy = el('p', { classes: ['footer-copy'] });
  copy.textContent = '© ' + new Date().getFullYear() + ' SysCore · Ingeniería en Sistemas Computacionales · Morelia, México';
  footer.appendChild(copy);

  var links = el('ul', { classes: ['footer-links'] });
  NAV_ITEMS.forEach(function (item) {
    var li = document.createElement('li');
    li.appendChild(el('a', { attrs: { href: item.href }, text: item.label }));
    links.appendChild(li);
  });
  footer.appendChild(links);
}

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────

function initNavbar() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  });
}

// ─── REVEAL EN SCROLL ────────────────────────────────────────────────────────

function initReveal() {
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (r) { observer.observe(r); });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  buildNavLinks();
  buildHero();
  buildAbout();
  buildServices();
  buildTech();
  buildTeam();
  buildContact();
  buildFooter();
  initNavbar();
  initSmoothScroll();
  setTimeout(initReveal, 100);
});

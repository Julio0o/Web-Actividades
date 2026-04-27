/**
 * SysCore — main.js
 * Construcción completa del DOM con document.createElement() y element.appendChild()
 * Sin librerías ni frameworks
 */

// ─── DATOS ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Nosotros',  href: '#about'    },
  { label: 'Servicios', href: '#services'  },
  { label: 'Tecnología',href: '#tech'      },
  { label: 'Equipo',    href: '#team'      },
];

const SERVICES = [
  {
    icon: '⚙️',
    name: 'Desarrollo de Software',
    desc: 'Diseño y construcción de aplicaciones robustas, escalables y mantenibles adaptadas a los requerimientos específicos de tu organización.',
    tags: ['Backend', 'APIs REST', 'Microservicios', 'CI/CD'],
    color: '#00e5ff',
  },
  {
    icon: '🏗️',
    name: 'Arquitectura de Sistemas',
    desc: 'Definición de arquitecturas de alto nivel que garantizan rendimiento, disponibilidad y evolución tecnológica a largo plazo.',
    tags: ['Distributed', 'Event-Driven', 'DDD', 'SLA 99.9%'],
    color: '#a78bfa',
  },
  {
    icon: '🔐',
    name: 'Ciberseguridad',
    desc: 'Auditorías de seguridad, análisis de vulnerabilidades, hardening de infraestructura y cumplimiento con estándares ISO 27001.',
    tags: ['Pentest', 'OWASP', 'Zero Trust', 'SIEM'],
    color: '#f43f5e',
  },
  {
    icon: '☁️',
    name: 'Cloud & DevOps',
    desc: 'Migración, diseño y gestión de infraestructura cloud con automatización de pipelines y cultura DevOps de extremo a extremo.',
    tags: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
    color: '#fb923c',
  },
  {
    icon: '🤖',
    name: 'Inteligencia Artificial',
    desc: 'Implementación de modelos de ML, procesamiento de lenguaje natural y soluciones de automatización inteligente para procesos críticos.',
    tags: ['ML Ops', 'NLP', 'LLMs', 'Data Pipeline'],
    color: '#34d399',
  },
  {
    icon: '📊',
    name: 'Consultoría Técnica',
    desc: 'Acompañamiento estratégico en decisiones tecnológicas, evaluación de stack, transformación digital y gobierno de datos.',
    tags: ['Tech Audit', 'Roadmap', 'Due Diligence', 'Mentoring'],
    color: '#fbbf24',
  },
];

const STATS = [
  { num: '120+', label: 'Proyectos entregados' },
  { num: '98%',  label: 'Clientes satisfechos' },
  { num: '15+',  label: 'Años de experiencia'  },
  { num: '40+',  label: 'Especialistas activos' },
];

const TECH_STACK = [
  { icon: '🐍', name: 'Python'      },
  { icon: '☕', name: 'Java'        },
  { icon: '⚡', name: 'Go'          },
  { icon: '🦀', name: 'Rust'        },
  { icon: '🌐', name: 'TypeScript'  },
  { icon: '🐘', name: 'PostgreSQL'  },
  { icon: '🍃', name: 'MongoDB'     },
  { icon: '📦', name: 'Redis'       },
  { icon: '🐳', name: 'Docker'      },
  { icon: '☸️',  name: 'Kubernetes'  },
  { icon: '🔥', name: 'Terraform'   },
  { icon: '⚙️',  name: 'CI/CD'      },
  { icon: '☁️',  name: 'AWS'         },
  { icon: '🌩️', name: 'GCP'         },
  { icon: '📡',  name: 'gRPC'        },
  { icon: '🛡️',  name: 'Vault'       },
];

const TEAM = [
  {
    emoji: '👩‍💻',
    name: 'Alessandra Hernandez Mercado',
    role: 'Lead Developer',
    skills: ['Frontend', 'UI/UX', 'Project Management'],
    bg: '#1a0d1a',
  },
  {
    emoji: '👨‍💻',
    name: 'Julio Cesar Gutierrez Rico',
    role: 'Systems Engineer',
    skills: ['Backend', 'Security', 'Architecture'],
    bg: '#0d1a2e',
  },
];

const TERMINAL_LINES = [
  { type: 'cmd',  text: 'soluciones-informaticas --status'           },
  { type: 'ok',   text: '✔ Todos los sistemas operativos'        },
  { type: 'cmd',  text: 'soluciones-informaticas --services list'    },
  { type: 'out',  text: '6 servicios disponibles'               },
  { type: 'cmd',  text: 'soluciones-informaticas --uptime'          },
  { type: 'ok',   text: '✔ 99.97% disponibilidad (30 días)'     },
  { type: 'cmd',  text: 'soluciones-informaticas --clients active'   },
  { type: 'out',  text: '42 clientes en producción'             },
];

// ─── UTILIDAD: CREAR ELEMENTO ─────────────────────────────────────────────────

/**
 * Crea un elemento HTML con opciones declarativas.
 * @param {string} tag - Tag HTML
 * @param {Object} opts - { classes, attrs, text, html }
 * @returns {HTMLElement}
 */
function el(tag, opts = {}) {
  const elem = document.createElement(tag);
  if (opts.classes) {
    opts.classes.forEach(function(c) { elem.classList.add(c); });
  }
  if (opts.attrs) {
    Object.keys(opts.attrs).forEach(function(key) {
      elem.setAttribute(key, opts.attrs[key]);
    });
  }
  if (opts.text !== undefined) elem.textContent = opts.text;
  if (opts.html !== undefined) elem.innerHTML   = opts.html;
  return elem;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function buildNavLinks() {
  var list = document.getElementById('navLinks');
  NAV_ITEMS.forEach(function(item) {
    var li = document.createElement('li');
    var a  = el('a', { attrs: { href: item.href }, text: item.label });
    li.appendChild(a);
    list.appendChild(li);
  });
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function buildHero() {
  // Tag superior
  var tag  = document.getElementById('heroTag');
  var dot  = el('span', { html: '◆' });
  dot.style.fontSize = '0.6rem';
  var txt  = el('span', { text: 'ISC · INGENIERÍA EN SISTEMAS COMPUTACIONALES' });
  tag.appendChild(dot);
  tag.appendChild(txt);

  // Título
  var h1   = document.getElementById('heroTitle');
  var line1 = document.createTextNode('Soluciones tecnológicas ');
  var em    = el('em', { text: 'de alto nivel' });
  h1.appendChild(line1);
  h1.appendChild(em);

  // Subtítulo
  var sub = document.getElementById('heroSub');
  sub.textContent = 'Somos ingenieros en sistemas computacionales especializados en arquitectura, seguridad y cloud. Transformamos retos complejos en sistemas confiables.';

  // CTAs
  var cta    = document.getElementById('heroCta');
  var btnPri = el('a', {
    classes: ['btn-primary'],
    attrs:   { href: '#services' },
    text:    'Ver servicios →',
  });
  var btnSec = el('a', {
    classes: ['btn-outline'],
    attrs:   { href: '#team' },
    text:    'Conocer el equipo',
  });
  cta.appendChild(btnPri);
  cta.appendChild(btnSec);

  // Terminal
  buildTerminal();
}

function buildTerminal() {
  var wrap = document.getElementById('heroTerminal');

  // Barra superior
  var bar  = el('div', { classes: ['terminal-bar'] });
  var colors = ['#ff5f57', '#ffbd2e', '#28c840'];
  colors.forEach(function(c) {
    var dot = el('div', { classes: ['t-dot'] });
    dot.style.background = c;
    bar.appendChild(dot);
  });
  var title = el('span', { text: 'soluciones informaticas ~ terminal' });
  title.style.cssText = 'font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);margin-left:0.5rem;letter-spacing:1px;';
  bar.appendChild(title);
  wrap.appendChild(bar);

  // Cuerpo
  var body = el('div', { classes: ['terminal-body'] });
  wrap.appendChild(body);

  var i = 0;
  function printLine() {
    if (i >= TERMINAL_LINES.length) {
      // Cursor parpadeante al final
      var last = el('div', { classes: ['t-line'] });
      var prompt = el('span', { classes: ['t-prompt'], text: '❯' });
      var cursor = el('span', { classes: ['t-cursor'] });
      last.appendChild(prompt);
      last.appendChild(cursor);
      body.appendChild(last);
      return;
    }
    var item = TERMINAL_LINES[i];
    var line = el('div', { classes: ['t-line'] });

    if (item.type === 'cmd') {
      var prompt = el('span', { classes: ['t-prompt'], text: '❯' });
      var cmd    = el('span', { classes: ['t-cmd'],    text: item.text });
      line.appendChild(prompt);
      line.appendChild(cmd);
    } else if (item.type === 'ok') {
      var out = el('span', { classes: ['t-ok'], text: item.text });
      out.style.paddingLeft = '1.1rem';
      line.appendChild(out);
    } else {
      var out = el('span', { classes: ['t-out'], text: item.text });
      out.style.paddingLeft = '1.1rem';
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
  // Header
  var hdr = document.getElementById('aboutHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 01. ABOUT' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Números que '));
  title.appendChild(el('span', { text: 'respaldan' }));
  title.appendChild(document.createTextNode(' nuestra experiencia'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  // Stats
  var grid = document.getElementById('aboutGrid');
  STATS.forEach(function(stat) {
    var card  = el('div', { classes: ['about-stat', 'reveal'] });
    var num   = el('span', { classes: ['stat-num'],   text: stat.num   });
    var label = el('span', { classes: ['stat-label'], text: stat.label });
    card.appendChild(num);
    card.appendChild(label);
    grid.appendChild(card);
  });
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function buildServices() {
  // Header
  var hdr = document.getElementById('servicesHeader');
  hdr.appendChild(el('span', { classes: ['section-label'], text: '// 02. SERVICIOS' }));
  var title = el('h2', { classes: ['section-title'] });
  title.appendChild(document.createTextNode('Lo que '));
  title.appendChild(el('span', { text: 'hacemos' }));
  title.appendChild(document.createTextNode(' mejor'));
  hdr.appendChild(title);
  hdr.appendChild(el('div', { classes: ['section-divider'] }));

  // Cards
  var grid = document.getElementById('servicesGrid');
  SERVICES.forEach(function(svc, idx) {
    var card  = el('div', { classes: ['service-card', 'reveal'] });
    card.style.setProperty('--accent-color', svc.color);

    // Índice
    var index = el('span', { classes: ['service-index'], text: '0' + (idx + 1) });
    card.appendChild(index);

    // Ícono
    var iconWrap = el('div', { classes: ['service-icon-wrap'] });
    iconWrap.style.background = svc.color + '18';
    var icon = el('span', { classes: ['service-icon'], text: svc.icon });
    iconWrap.appendChild(icon);
    card.appendChild(iconWrap);

    // Nombre y descripción
    card.appendChild(el('h3', { classes: ['service-name'], text: svc.name }));
    card.appendChild(el('p',  { classes: ['service-desc'], text: svc.desc }));

    // Tags
    var tagsWrap = el('div', { classes: ['service-tags'] });
    svc.tags.forEach(function(tag) {
      var t = el('span', { classes: ['service-tag'], text: tag });
      t.style.color       = svc.color;
      t.style.borderColor = svc.color + '30';
      tagsWrap.appendChild(t);
    });
    card.appendChild(tagsWrap);

    grid.appendChild(card);
  });
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
  // Duplicamos para efecto marquee continuo
  var fullStack = TECH_STACK.concat(TECH_STACK);
  fullStack.forEach(function(item) {
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
  TEAM.forEach(function(member) {
    var card   = el('div', { classes: ['team-card', 'reveal'] });

    // Avatar
    var avatar = el('div', { classes: ['team-avatar'], text: member.emoji });
    avatar.style.background = member.bg;
    card.appendChild(avatar);

    card.appendChild(el('div', { classes: ['team-name'], text: member.name }));
    card.appendChild(el('div', { classes: ['team-role'], text: member.role }));

    // Skills
    var skills = el('div', { classes: ['team-skills'] });
    member.skills.forEach(function(s) {
      skills.appendChild(el('span', { classes: ['team-skill'], text: s }));
    });
    card.appendChild(skills);

    grid.appendChild(card);
  });
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
  NAV_ITEMS.forEach(function(item) {
    var li = document.createElement('li');
    li.appendChild(el('a', { attrs: { href: item.href }, text: item.label }));
    links.appendChild(li);
  });
  footer.appendChild(links);
}

// ─── CURSOR PERSONALIZADO ────────────────────────────────────────────────────

function initCursor() {
  var cursor    = document.getElementById('cursor');
  var cursorDot = document.getElementById('cursorDot');

  document.addEventListener('mousemove', function(e) {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
  });

  // Efecto hover sobre elementos interactivos
  var interactives = ['a', 'button', '.service-card', '.team-card'];
  interactives.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(elem) {
      elem.addEventListener('mouseenter', function() {
        cursor.style.width  = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = '#fff';
      });
      elem.addEventListener('mouseleave', function() {
        cursor.style.width  = '32px';
        cursor.style.height = '32px';
        cursor.style.borderColor = 'var(--accent)';
      });
    });
  });
}

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────

function initNavbar() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ─── REVEAL EN SCROLL ────────────────────────────────────────────────────────

function initReveal() {
  var reveals = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        // Delay escalonado para cada tarjeta
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function(r) { observer.observe(r); });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────────────────────

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  buildNavLinks();
  buildHero();
  buildAbout();
  buildServices();
  buildTech();
  buildTeam();
  buildFooter();

  initNavbar();
  initSmoothScroll();

  // Reveal después de que el DOM esté listo
  setTimeout(initReveal, 100);
});

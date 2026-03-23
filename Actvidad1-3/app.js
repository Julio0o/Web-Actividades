var STORAGE_KEY = 'syscode_servicios_extra';

var servicios = [
    {
        nombre: "Desarrollo Web Full-Stack",
        descripcion: "Diseño y desarrollo de sitios web modernos y responsivos utilizando las últimas tecnologías. Incluye frontend, backend y despliegue en la nube.",
        precio: 1500,
        imagen: "../Actividad 1/img/web_development.png"
    },
    {
        nombre: "Desarrollo de Apps Móviles",
        descripcion: "Creación de aplicaciones nativas e híbridas para iOS y Android con interfaces intuitivas y rendimiento optimizado.",
        precio: 2500,
        imagen: "../Actividad 1/img/mobile_development.png"
    },
    {
        nombre: "Infraestructura de Redes",
        descripcion: "Diseño, implementación y administración de redes LAN/WAN empresariales. Configuración de routers, switches y puntos de acceso.",
        precio: 1800,
        imagen: "../Actividad 1/img/network_infrastructure.png"
    },
    {
        nombre: "Ciberseguridad",
        descripcion: "Auditorías de seguridad, pruebas de penetración y configuración de firewalls para proteger tu infraestructura contra amenazas digitales.",
        precio: 2200,
        imagen: "../Actividad 1/img/cybersecurity.png"
    },
    {
        nombre: "Administración de Bases de Datos",
        descripcion: "Diseño, optimización y mantenimiento de bases de datos relacionales y NoSQL. Respaldos automáticos y recuperación ante desastres.",
        precio: 1200,
        imagen: "../Actividad 1/img/database_admin.png"
    },
    {
        nombre: "Soporte Técnico",
        descripcion: "Asistencia técnica especializada para equipos de cómputo, servidores y periféricos. Diagnóstico y reparación de hardware y software.",
        precio: 500,
        imagen: "../Actividad 1/img/tech_support.png"
    },
    {
        nombre: "Cloud Computing",
        descripcion: "Migración y administración de servicios en la nube (AWS, Azure, GCP). Arquitectura escalable y optimización de costos.",
        precio: 1600,
        imagen: "../Actividad 1/img/cloud_computing.png"
    },
    {
        nombre: "Consultoría de Software",
        descripcion: "Asesoría estratégica para la selección, implementación y personalización de soluciones de software empresarial.",
        precio: 800,
        imagen: "../Actividad 1/img/software_consulting.png"
    },
    {
        nombre: "Análisis de Datos",
        descripcion: "Recopilación, procesamiento y visualización de datos para la toma de decisiones informadas. Dashboards interactivos y reportes automatizados.",
        precio: 950,
        imagen: "../Actividad 1/img/data_analytics.png"
    },
    {
        nombre: "Inteligencia Artificial y Automatización",
        descripcion: "Desarrollo de soluciones de IA, chatbots inteligentes y automatización de procesos empresariales con machine learning.",
        precio: 3000,
        imagen: "../Actividad 1/img/ai_automation.png"
    }
];

// 2. DATOS — Integrantes del equipo
var equipo = [
    {
        nombre: "Julio Cesar Gutierres Rico",
        rol: "Líder de Proyecto / Full-Stack Developer",
        bio: "Estudiante de Ingeniería en Sistemas Computacionales con experiencia en desarrollo web, administración de servidores Linux y bases de datos. Apasionado por la tecnología y la innovación.",
        iniciales: "JG"
    },
    {
        nombre: "Alessandra Hernández Mercado",
        rol: "Especialista en Ciberseguridad",
        bio: "Enfocada en seguridad informática y redes. Certificada en ethical hacking y análisis de vulnerabilidades. Experiencia en auditorías de seguridad para empresas locales.",
        iniciales: "AH"
    },
];

// ─── HELPER: Obtener servicios extra del localStorage ───
function getExtras() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
        return [];
    }
}

// ─── HELPER: Lista combinada (base + extras) ───
function getTodosLosServicios() {
    return servicios.concat(getExtras());
}

// 3. COMPONENTES REUTILIZABLES
function crearHeader() {
    var header = document.createElement("header");
    header.className = "site-header";
    header.id = "site-header";

    var inner = document.createElement("div");
    inner.className = "header-inner";

    // Logo
    var logo = document.createElement("div");
    logo.className = "logo";
    logo.onclick = function () { navegarA("inicio"); };

    var logoIcon = document.createElement("div");
    logoIcon.className = "logo-icon";
    logoIcon.textContent = "⟨/⟩";

    var logoText = document.createElement("span");
    logoText.textContent = "Soluciones informaticas";

    logo.appendChild(logoIcon);
    logo.appendChild(logoText);

    var toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.id = "menu-toggle";
    toggle.textContent = "☰";
    toggle.setAttribute("aria-label", "Abrir menú");
    toggle.onclick = function () {
        var menu = document.getElementById("nav-menu");
        menu.classList.toggle("open");
    };

    // Nav
    var nav = crearNav();

    inner.appendChild(logo);
    inner.appendChild(nav);
    inner.appendChild(toggle);

    header.appendChild(inner);
    return header;
}

function crearNav() {
    var ul = document.createElement("ul");
    ul.className = "nav-menu";
    ul.id = "nav-menu";

    var items = [
        { label: "Inicio", seccion: "inicio" },
        { label: "Servicios", seccion: "servicios" },
        { label: "Equipo", seccion: "equipo" }
    ];

    for (var i = 0; i < items.length; i++) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.className = "nav-link";
        btn.textContent = items[i].label;
        btn.setAttribute("data-seccion", items[i].seccion);
        btn.onclick = (function (seccion) {
            return function () {
                navegarA(seccion);
                var menu = document.getElementById("nav-menu");
                if (menu) menu.classList.remove("open");
            };
        })(items[i].seccion);
        li.appendChild(btn);
        ul.appendChild(li);
    }

    return ul;
}

function crearFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";

    var inner = document.createElement("div");
    inner.className = "footer-inner";

    var linksList = document.createElement("ul");
    linksList.className = "footer-links";

    var footerItems = ["Inicio", "Servicios", "Equipo"];
    for (var i = 0; i < footerItems.length; i++) {
        var li = document.createElement("li");
        li.textContent = footerItems[i];
        li.onclick = (function (seccion) {
            return function () { navegarA(seccion.toLowerCase()); };
        })(footerItems[i]);
        linksList.appendChild(li);
    }

    var copy = document.createElement("p");
    copy.textContent = "© 2026 SysCode Solutions — Ingeniería en Sistemas Computacionales";

    inner.appendChild(linksList);
    inner.appendChild(copy);
    footer.appendChild(inner);

    return footer;
}

// 4. SECCIONES (VISTAS)
function renderInicio() {
    var hero = document.createElement("section");
    hero.className = "hero";
    hero.id = "section-inicio";

    var badge = document.createElement("div");
    badge.className = "hero-badge";
    badge.textContent = " Ingeniería en Sistemas Computacionales";

    var h1 = document.createElement("h1");
    h1.innerHTML = 'Soluciones tecnológicas <span class="gradient-text">de alto nivel</span>';

    var sub = document.createElement("p");
    sub.className = "hero-subtitle";
    sub.textContent = "Ofrecemos servicios profesionales en desarrollo de software, redes, ciberseguridad e inteligencia artificial para impulsar tu empresa al siguiente nivel.";

    var ctaDiv = document.createElement("div");
    ctaDiv.className = "hero-cta";

    var btnServicios = document.createElement("button");
    btnServicios.className = "btn btn-primary";
    btnServicios.textContent = "Ver Servicios →";
    btnServicios.onclick = function () { navegarA("servicios"); };

    var btnEquipo = document.createElement("button");
    btnEquipo.className = "btn btn-secondary";
    btnEquipo.textContent = "Nuestro Equipo";
    btnEquipo.onclick = function () { navegarA("equipo"); };

    ctaDiv.appendChild(btnServicios);
    ctaDiv.appendChild(btnEquipo);

    hero.appendChild(badge);
    hero.appendChild(h1);
    hero.appendChild(sub);
    hero.appendChild(ctaDiv);

    return hero;
}

/**
 * Renderiza la sección de Servicios.
 * MODIFICADO: Incluye botón "Agregar Servicio", carga extras del localStorage
 * y muestra un badge "Nuevo" en los servicios recién agregados.
 */
function renderServicios() {
    var section = document.createElement("section");
    section.className = "section";
    section.id = "section-servicios";

    // ── Encabezado de sección con botón de alta ──
    var headerDiv = document.createElement("div");
    headerDiv.className = "section-header";

    var tag = document.createElement("span");
    tag.className = "section-tag";
    tag.textContent = "Catálogo";

    var titulo = document.createElement("h2");
    titulo.className = "section-title";
    titulo.textContent = "Nuestros Servicios";

    var desc = document.createElement("p");
    desc.className = "section-desc";
    desc.textContent = "Soluciones integrales de tecnología adaptadas a las necesidades de tu negocio.";

    // ── BOTÓN AGREGAR SERVICIO ──
    var addBtn = document.createElement("a");
    addBtn.href = "alta.html";
    addBtn.className = "btn btn-primary add-service-btn";
    addBtn.innerHTML = '<span class="add-icon">＋</span> Agregar Servicio';

    headerDiv.appendChild(tag);
    headerDiv.appendChild(titulo);
    headerDiv.appendChild(desc);
    headerDiv.appendChild(addBtn);   // ← NUEVO
    section.appendChild(headerDiv);

    // ── Grid de servicios (base + extras) ──
    var lista = getTodosLosServicios();

    var grid = document.createElement("div");
    grid.className = "services-grid";

    lista.forEach(function (servicio) {
        var card = document.createElement("div");
        card.className = "service-card";

        // Badge "Nuevo" para servicios recién agregados
        if (servicio.esNuevo) {
            card.classList.add("nuevo");
            var newBadge = document.createElement("span");
            newBadge.className = "new-badge";
            newBadge.textContent = "Nuevo";
            card.appendChild(newBadge);
        }

        // Badge "Premium" para precio > $1000 (aplica a TODOS, incluidos los nuevos)
        if (servicio.precio > 1000) {
            card.classList.add("premium");
            var badge = document.createElement("span");
            badge.className = "premium-badge";
            badge.textContent = "Premium";
            // Si el servicio también es nuevo, el badge Premium va a la izquierda
            if (servicio.esNuevo) {
                badge.style.right = "auto";
                badge.style.left = "16px";
            }
            card.appendChild(badge);
        }

        // Imagen — si no carga, muestra emoji de placeholder
        var img = document.createElement("img");
        img.className = "service-card-img";
        img.src = servicio.imagen || "";
        img.alt = servicio.nombre;
        img.loading = "lazy";
        img.onerror = function () {
            // Reemplazar imagen rota por placeholder visual
            var ph = document.createElement("div");
            ph.className = "service-card-placeholder";
            ph.textContent = "💻";
            img.parentNode.replaceChild(ph, img);
        };

        // Cuerpo
        var body = document.createElement("div");
        body.className = "service-card-body";

        var h3 = document.createElement("h3");
        h3.textContent = servicio.nombre;

        var p = document.createElement("p");
        p.textContent = servicio.descripcion;

        var precio = document.createElement("div");
        precio.className = "service-price";
        precio.innerHTML = "$" + servicio.precio.toLocaleString("es-MX") + " <span>MXN</span>";

        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(precio);

        card.appendChild(img);
        card.appendChild(body);

        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}

function renderEquipo() {
    var section = document.createElement("section");
    section.className = "section";
    section.id = "section-equipo";

    var headerDiv = document.createElement("div");
    headerDiv.className = "section-header";

    var tag = document.createElement("span");
    tag.className = "section-tag";
    tag.textContent = "Equipo";

    var titulo = document.createElement("h2");
    titulo.className = "section-title";
    titulo.textContent = "Integrantes del Equipo";

    var desc = document.createElement("p");
    desc.className = "section-desc";
    desc.textContent = "Profesionales comprometidos con la excelencia tecnológica.";

    headerDiv.appendChild(tag);
    headerDiv.appendChild(titulo);
    headerDiv.appendChild(desc);
    section.appendChild(headerDiv);

    var grid = document.createElement("div");
    grid.className = "team-grid";

    for (var i = 0; i < equipo.length; i++) {
        var miembro = equipo[i];

        var card = document.createElement("div");
        card.className = "team-card";

        var avatar = document.createElement("div");
        avatar.className = "team-avatar";
        avatar.textContent = miembro.iniciales;

        var h3 = document.createElement("h3");
        h3.textContent = miembro.nombre;

        var role = document.createElement("p");
        role.className = "team-role";
        role.textContent = miembro.rol;

        var bio = document.createElement("p");
        bio.className = "team-bio";
        bio.textContent = miembro.bio;

        card.appendChild(avatar);
        card.appendChild(h3);
        card.appendChild(role);
        card.appendChild(bio);

        grid.appendChild(card);
    }

    section.appendChild(grid);
    return section;
}

// 5. TOAST DE BIENVENIDA (al regresar de alta-servicio.html)
function mostrarToastSiNuevo() {
    var nombre = sessionStorage.getItem('syscode_just_added');
    if (!nombre) return;
    sessionStorage.removeItem('syscode_just_added');

    var toast = document.createElement("div");
    toast.style.cssText = [
        "position:fixed", "bottom:28px", "right:28px", "z-index:9999",
        "background:rgba(16,185,129,0.15)", "border:1px solid rgba(16,185,129,0.4)",
        "color:#34d399", "padding:14px 22px", "border-radius:12px",
        "font-size:.9rem", "font-weight:600", "box-shadow:0 8px 30px rgba(0,0,0,0.4)",
        "display:flex", "align-items:center", "gap:10px",
        "animation:fadeInUp .4s ease"
    ].join(";");
    toast.innerHTML = '<span style="font-size:1.1rem">✓</span> "' + nombre + '" agregado correctamente.';

    // Asegurarse de que la animación exista
    if (!document.getElementById('toast-keyframe')) {
        var style = document.createElement("style");
        style.id = "toast-keyframe";
        style.textContent = "@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}";
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(function () {
        toast.style.transition = "opacity .4s, transform .4s";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
}

// 6. NAVEGACIÓN SPA
var seccionActual = "inicio";

function navegarA(seccion) {
    seccionActual = seccion;
    var app = document.getElementById("app");

    app.innerHTML = "";

    app.appendChild(crearHeader());

    if (seccion === "inicio") {
        app.appendChild(renderInicio());
    } else if (seccion === "servicios") {
        app.appendChild(renderServicios());
    } else if (seccion === "equipo") {
        app.appendChild(renderEquipo());
    }

    app.appendChild(crearFooter());

    actualizarNavActivo(seccion);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function actualizarNavActivo(seccion) {
    var links = document.querySelectorAll(".nav-link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("data-seccion") === seccion) {
            links[i].classList.add("active");
        } else {
            links[i].classList.remove("active");
        }
    }
}

// 7. INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", function () {
    // Detectar sección destino via sessionStorage (más confiable que hash)
    var destino = sessionStorage.getItem('syscode_nav_destino');
    if (destino) {
        sessionStorage.removeItem('syscode_nav_destino');
        navegarA(destino);
    } else {
        navegarA("inicio");
    }

    // Mostrar toast si se acaba de agregar un servicio
    setTimeout(function () {
        mostrarToastSiNuevo();
    }, 150);
});
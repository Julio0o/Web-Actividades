/* =============================================
   SysCode Solutions — App Logic
   =============================================
   - Datos de servicios y equipo
   - Componentes reutilizables (header, footer, nav)
   - Renderizado dinámico con document.createElement
   ============================================= */

// ============================================
// 1. DATOS — Mínimo 10 servicios
// ============================================

var servicios = [
    {
        nombre: "Desarrollo Web Full-Stack",
        descripcion: "Diseño y desarrollo de sitios web modernos y responsivos utilizando las últimas tecnologías. Incluye frontend, backend y despliegue en la nube.",
        precio: 1500,
        imagen: "img/web_development.png"
    },
    {
        nombre: "Desarrollo de Apps Móviles",
        descripcion: "Creación de aplicaciones nativas e híbridas para iOS y Android con interfaces intuitivas y rendimiento optimizado.",
        precio: 2500,
        imagen: "img/mobile_development.png"
    },
    {
        nombre: "Infraestructura de Redes",
        descripcion: "Diseño, implementación y administración de redes LAN/WAN empresariales. Configuración de routers, switches y puntos de acceso.",
        precio: 1800,
        imagen: "img/network_infrastructure.png"
    },
    {
        nombre: "Ciberseguridad",
        descripcion: "Auditorías de seguridad, pruebas de penetración y configuración de firewalls para proteger tu infraestructura contra amenazas digitales.",
        precio: 2200,
        imagen: "img/cybersecurity.png"
    },
    {
        nombre: "Administración de Bases de Datos",
        descripcion: "Diseño, optimización y mantenimiento de bases de datos relacionales y NoSQL. Respaldos automáticos y recuperación ante desastres.",
        precio: 1200,
        imagen: "img/database_admin.png"
    },
    {
        nombre: "Soporte Técnico",
        descripcion: "Asistencia técnica especializada para equipos de cómputo, servidores y periféricos. Diagnóstico y reparación de hardware y software.",
        precio: 500,
        imagen: "img/tech_support.png"
    },
    {
        nombre: "Cloud Computing",
        descripcion: "Migración y administración de servicios en la nube (AWS, Azure, GCP). Arquitectura escalable y optimización de costos.",
        precio: 1600,
        imagen: "img/cloud_computing.png"
    },
    {
        nombre: "Consultoría de Software",
        descripcion: "Asesoría estratégica para la selección, implementación y personalización de soluciones de software empresarial.",
        precio: 800,
        imagen: "img/software_consulting.png"
    },
    {
        nombre: "Análisis de Datos",
        descripcion: "Recopilación, procesamiento y visualización de datos para la toma de decisiones informadas. Dashboards interactivos y reportes automatizados.",
        precio: 950,
        imagen: "img/data_analytics.png"
    },
    {
        nombre: "Inteligencia Artificial y Automatización",
        descripcion: "Desarrollo de soluciones de IA, chatbots inteligentes y automatización de procesos empresariales con machine learning.",
        precio: 3000,
        imagen: "img/ai_automation.png"
    }
];

// ============================================
// 2. DATOS — Integrantes del equipo
// ============================================

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

// ============================================
// 3. COMPONENTES REUTILIZABLES
// ============================================

/**
 * Crea el header con logo y menú de navegación.
 * Componente reutilizable que se inserta en cada vista.
 */
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

    // Mobile toggle
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

/**
 * Crea la lista de navegación.
 * Se reutiliza dentro del header.
 */
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
        // Closure para capturar el valor correcto
        btn.onclick = (function (seccion) {
            return function () {
                navegarA(seccion);
                // Cerrar menú móvil
                var menu = document.getElementById("nav-menu");
                if (menu) menu.classList.remove("open");
            };
        })(items[i].seccion);
        li.appendChild(btn);
        ul.appendChild(li);
    }

    return ul;
}

/**
 * Crea el footer con créditos.
 * Componente reutilizable.
 */
function crearFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";

    var inner = document.createElement("div");
    inner.className = "footer-inner";

    // Enlaces del footer
    var linksList = document.createElement("ul");
    linksList.className = "footer-links";

    var footerItems = ["Inicio", "Servicios", "Equipo"];
    for (var i = 0; i < footerItems.length; i++) {
        var li = document.createElement("li");
        li.textContent = footerItems[i];
        li.onclick = (function (seccion) {
            return function () {
                navegarA(seccion.toLowerCase());
            };
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

// ============================================
// 4. SECCIONES (VISTAS)
// ============================================

/**
 * Renderiza la sección Hero (Inicio).
 */
function renderInicio() {
    var hero = document.createElement("section");
    hero.className = "hero";
    hero.id = "section-inicio";

    var badge = document.createElement("div");
    badge.className = "hero-badge";
    badge.textContent = "✦ Ingeniería en Sistemas Computacionales";

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
 * Usa bucle forEach para crear tarjetas y condicional if para precios > $1000.
 */
function renderServicios() {
    var section = document.createElement("section");
    section.className = "section";
    section.id = "section-servicios";

    // Encabezado de sección
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

    headerDiv.appendChild(tag);
    headerDiv.appendChild(titulo);
    headerDiv.appendChild(desc);
    section.appendChild(headerDiv);

    // Grid de servicios
    var grid = document.createElement("div");
    grid.className = "services-grid";

    // ——————— BUCLE: Crear una tarjeta por cada servicio ———————
    servicios.forEach(function (servicio) {
        var card = document.createElement("div");
        card.className = "service-card";

        // ——————— CONDICIONAL: Precio mayor a $1000 ———————
        if (servicio.precio > 1000) {
            card.classList.add("premium");

            // Badge "Premium"
            var badge = document.createElement("span");
            badge.className = "premium-badge";
            badge.textContent = "Premium";
            card.appendChild(badge);
        }

        // Imagen
        var img = document.createElement("img");
        img.className = "service-card-img";
        img.src = servicio.imagen;
        img.alt = servicio.nombre;
        img.loading = "lazy";

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

/**
 * Renderiza la sección de Equipo / Integrantes.
 * Muestra nombre, rol y experiencia/CV breve.
 */
function renderEquipo() {
    var section = document.createElement("section");
    section.className = "section";
    section.id = "section-equipo";

    // Encabezado
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

    // Grid de tarjetas de equipo
    var grid = document.createElement("div");
    grid.className = "team-grid";

    // ——— BUCLE: Crear tarjeta por cada integrante ———
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

// 5. NAVEGACIÓN SPA

var seccionActual = "inicio";

/**
 * Navega a la sección indicada, limpia el contenido
 * del div#app y re-inserta header + sección + footer.
 */
function navegarA(seccion) {
    seccionActual = seccion;
    var app = document.getElementById("app");

    // Limpiar contenido
    app.innerHTML = "";

    // Insertar header (reutilizable)
    app.appendChild(crearHeader());

    // Insertar sección correspondiente
    if (seccion === "inicio") {
        app.appendChild(renderInicio());
    } else if (seccion === "servicios") {
        app.appendChild(renderServicios());
    } else if (seccion === "equipo") {
        app.appendChild(renderEquipo());
    }

    // Insertar footer (reutilizable)
    app.appendChild(crearFooter());

    // Marcar enlace activo
    actualizarNavActivo(seccion);

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: "smooth" });
}

//Resalta el enlace de navegación activo.

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
// 6. INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", function () {
    navegarA("inicio");
});

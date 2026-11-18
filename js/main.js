(function () {
  "use strict";

  const datos = window.PORTFOLIO;
  if (!datos) {
    document.body.innerHTML = "<p style='padding:2rem'>No se encontró data/perfil.js</p>";
    return;
  }
  const { perfil, habilidades = [], experiencia = [], formacion = [], certificaciones = [], proyectos = [] } = datos;

  const $ = (sel) => document.querySelector(sel);

  /** Crea un elemento: el("a", { href: "#", class: "x" }, "texto", otroNodo) */
  function el(tag, attrs, ...hijos) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const h of hijos.flat()) {
      if (h === null || h === undefined || h === false) continue;
      n.append(h instanceof Node ? h : document.createTextNode(String(h)));
    }
    return n;
  }

  const lista = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const iniciales = (nombre) =>
    nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  const enlaceExterno = (href, texto, clase) =>
    el("a", { href, class: clase, target: "_blank", rel: "noopener noreferrer" }, texto);

  /* ---------- Cabecera y hero ---------- */
  document.title = `${perfil.nombre} · ${perfil.rol}`;
  $("#nav-logo").textContent = iniciales(perfil.nombre);
  $("#hero-nombre").textContent = perfil.nombre;
  $("#hero-rol").textContent = perfil.rol;
  $("#hero-resumen").textContent = perfil.resumen;

  const foto = $("#hero-foto");
  if (perfil.foto) foto.append(el("img", { src: perfil.foto, alt: `Foto de ${perfil.nombre}` }));
  else foto.append(el("span", {}, iniciales(perfil.nombre)));

  const btnCv = $("#btn-cv");
  if (perfil.cv) {
    btnCv.href = perfil.cv;
    btnCv.setAttribute("download", "");
  } else {
    btnCv.textContent = "Imprimir CV";
    btnCv.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  }

  const pintarRedes = (ul) =>
    lista(perfil.redes).forEach((r) => ul.append(el("li", {}, enlaceExterno(r.url, r.nombre))));
  pintarRedes($("#hero-redes"));

  /* ---------- Sobre mí ---------- */
  lista(perfil.sobreMi).forEach((p) => $("#sobre-texto").append(el("p", {}, p)));
  const dl = $("#sobre-datos");
  const dato = (k, v) => v && dl.append(el("dt", {}, k), el("dd", {}, v));
  dato("Ubicación", perfil.ubicacion);
  dato("Email", perfil.email && el("a", { href: `mailto:${perfil.email}` }, perfil.email));
  dato("Teléfono", perfil.telefono);
  if (lista(perfil.idiomas).length)
    dato("Idiomas", perfil.idiomas.map((i) => `${i.idioma} (${i.nivel})`).join(" · "));

  /* ---------- Habilidades ---------- */
  habilidades.forEach((h) =>
    $("#lista-habilidades").append(
      el("div", { class: "tarjeta" },
        el("h3", {}, h.categoria),
        el("ul", { class: "etiquetas" }, lista(h.items).map((i) => el("li", {}, i)))
      )
    )
  );

  /* ---------- Experiencia y formación ---------- */
  const itemTimeline = (titulo, lugar, inicio, fin, desc) =>
    el("li", {},
      el("span", { class: "timeline__fecha" }, [inicio, fin].filter(Boolean).join(" — ")),
      el("h4", {}, titulo),
      el("p", { class: "timeline__lugar" }, lugar),
      Array.isArray(desc)
        ? el("ul", { class: "timeline__desc" }, desc.map((d) => el("li", {}, d)))
        : desc && el("p", { class: "timeline__desc" }, desc)
    );

  experiencia.forEach((e) =>
    $("#lista-experiencia").append(itemTimeline(e.puesto, e.empresa, e.inicio, e.fin, e.descripcion))
  );
  formacion.forEach((f) =>
    $("#lista-formacion").append(itemTimeline(f.titulo, f.centro, f.inicio, f.fin, f.descripcion))
  );
  if (certificaciones.length) {
    $("#bloque-certificaciones").hidden = false;
    certificaciones.forEach((c) => {
      const nombre = c.url ? enlaceExterno(c.url, c.nombre) : c.nombre;
      $("#lista-certificaciones").append(
        el("li", {}, nombre, el("span", {}, ` — ${[c.entidad, c.fecha].filter(Boolean).join(", ")}`))
      );
    });
  }

  /* ---------- Proyectos ---------- */
  const ordenados = [...proyectos].sort(
    (a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0) || String(b.fecha || "").localeCompare(String(a.fecha || ""))
  );
  const contProyectos = $("#lista-proyectos");
  const contFiltros = $("#filtros");
  let filtroActivo = "Todos";

  function tarjetaProyecto(p) {
    const media = p.imagen
      ? el("img", { src: p.imagen, alt: "", loading: "lazy" })
      : el("span", {}, iniciales(p.titulo));
    return el("article", { class: "tarjeta proyecto" + (p.destacado ? " proyecto--destacado" : "") },
      el("button", { class: "proyecto__media", "aria-label": `Ver detalles de ${p.titulo}`, onclick: () => abrirProyecto(p) }, media),
      el("div", { class: "proyecto__cuerpo" },
        el("div", { class: "proyecto__cabecera" },
          el("h3", {}, p.titulo),
          p.fecha && el("span", { class: "proyecto__fecha" }, p.fecha)
        ),
        el("p", {}, p.resumen),
        el("ul", { class: "etiquetas etiquetas--peq" }, lista(p.tecnologias).map((t) => el("li", {}, t))),
        el("div", { class: "proyecto__enlaces" },
          el("button", { class: "enlace", onclick: () => abrirProyecto(p) }, "Detalles"),
          p.repo && enlaceExterno(p.repo, "Código", "enlace"),
          p.demo && enlaceExterno(p.demo, "Demo", "enlace")
        )
      )
    );
  }

  function pintarProyectos() {
    contProyectos.replaceChildren();
    const visibles = ordenados.filter(
      (p) => filtroActivo === "Todos" || lista(p.tecnologias).includes(filtroActivo)
    );
    if (!visibles.length) contProyectos.append(el("p", { class: "vacio" }, "Aún no hay proyectos aquí."));
    visibles.forEach((p) => contProyectos.append(tarjetaProyecto(p)));
    contFiltros.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filtro === filtroActivo))
    );
  }

  const tecnologias = [...new Set(proyectos.flatMap((p) => lista(p.tecnologias)))].sort();
  if (tecnologias.length > 1) {
    ["Todos", ...tecnologias].forEach((t) =>
      contFiltros.append(
        el("button", { class: "filtro", "data-filtro": t, onclick: () => { filtroActivo = t; pintarProyectos(); } }, t)
      )
    );
  }
  pintarProyectos();

  /* ---------- Modal de proyecto ---------- */
  const modal = $("#modal-proyecto");
  function abrirProyecto(p) {
    $("#modal-contenido").replaceChildren(...[
      p.imagen && el("img", { class: "modal__img", src: p.imagen, alt: "" }),
      el("h3", {}, p.titulo),
      p.fecha && el("p", { class: "proyecto__fecha" }, p.fecha),
      el("ul", { class: "etiquetas etiquetas--peq" }, lista(p.tecnologias).map((t) => el("li", {}, t))),
      (lista(p.descripcion).length ? lista(p.descripcion) : [p.resumen]).map((d) => el("p", {}, d)),
      el("div", { class: "hero__botones" },
        p.repo && enlaceExterno(p.repo, "Ver código", "btn"),
        p.demo && enlaceExterno(p.demo, "Ver demo", "btn btn--primario")
      ),
    ].flat().filter(Boolean));
    modal.showModal();
  }
  $("#modal-cerrar").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* ---------- Contacto y pie ---------- */
  const mail = $("#contacto-email");
  mail.href = `mailto:${perfil.email}`;
  mail.textContent = perfil.email;
  pintarRedes($("#contacto-redes"));
  $("#pie-texto").textContent = `© ${new Date().getFullYear()} ${perfil.nombre}`;

  /* ---------- Tema claro/oscuro ---------- */
  $("#btn-tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const oscuroActual =
      raiz.dataset.theme === "dark" ||
      (!raiz.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    raiz.dataset.theme = oscuroActual ? "light" : "dark";
    try { localStorage.setItem("tema", raiz.dataset.theme); } catch (e) {}
  });

  /* ---------- Menú móvil ---------- */
  const btnMenu = $("#btn-menu");
  const links = $("#nav-links");
  btnMenu.addEventListener("click", () => {
    const abierto = links.classList.toggle("abierto");
    btnMenu.setAttribute("aria-expanded", String(abierto));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("abierto");
      btnMenu.setAttribute("aria-expanded", "false");
    }
  });
})();

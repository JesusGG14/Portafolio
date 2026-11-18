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
      if (h === null || h === undefined || h === false || h === "") continue;
      n.append(h instanceof Node ? h : document.createTextNode(String(h)));
    }
    return n;
  }

  const lista = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const iniciales = (nombre) =>
    nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  const enlaceExterno = (href, texto, clase) =>
    el("a", { href, class: clase, target: "_blank", rel: "noopener noreferrer" }, texto);
  const etiquetas = (items, clase = "etiquetas") => el("ul", { class: clase }, lista(items).map((i) => el("li", {}, i)));
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;

  const pintarFoto = (cont) =>
    cont.append(
      perfil.foto
        ? el("img", { src: perfil.foto, alt: `Foto de ${perfil.nombre}` })
        : el("span", {}, iniciales(perfil.nombre))
    );

  /* ---------- Cabecera ---------- */
  document.title = `${perfil.nombre} · Portafolio`;
  $("#nav-logo").textContent = iniciales(perfil.nombre);

  /* ---------- Inicio (bandeja de entrada) ---------- */
  pintarFoto($("#inicio-foto"));
  $("#inicio-nombre").textContent = perfil.nombre;
  $("#inicio-rol").textContent = perfil.rol;
  $("#inicio-resumen").textContent = perfil.resumen;
  $("#mensaje-sobre").textContent = "Mi perfil profesional, experiencia, formación, conocimientos e idiomas.";
  $("#mensaje-proyectos").textContent = proyectos.length
    ? proyectos.map((p) => p.titulo).slice(0, 3).join(" · ") + (proyectos.length > 3 ? " …" : "")
    : "Próximamente";
  $("#meta-proyectos").textContent = plural(proyectos.length, "proyecto", "proyectos");
  $("#bandeja-contador").textContent = "2 secciones";

  /* ---------- Sobre mí (CV) ---------- */
  pintarFoto($("#cv-foto"));
  $("#cv-nombre").textContent = perfil.nombre;
  $("#cv-rol").textContent = perfil.rol;
  lista(perfil.sobreMi).forEach((p) => $("#cv-sobre").append(el("p", {}, p)));

  const btnCv = $("#btn-cv");
  if (perfil.cv) {
    btnCv.href = perfil.cv;
    btnCv.setAttribute("download", "");
  } else {
    btnCv.hidden = true;
  }

  const dl = $("#cv-datos");
  const dato = (k, v) => v && dl.append(el("dt", {}, k), el("dd", {}, v));
  dato("Ubicación", perfil.ubicacion);
  dato("Email", perfil.email && el("a", { href: `mailto:${perfil.email}` }, perfil.email));
  dato("Teléfono", perfil.telefono && el("a", { href: `tel:${perfil.telefono.replace(/\s/g, "")}` }, perfil.telefono));
  lista(perfil.redes).forEach((r) => dato(r.nombre, enlaceExterno(r.url, r.url.replace(/^https?:\/\/(www\.)?/, ""))));
  lista(perfil.datosExtra).forEach((d) => dato(d.etiqueta, d.valor));

  habilidades.forEach((h) =>
    $("#lista-habilidades").append(el("div", { class: "habilidad" }, el("h3", {}, h.categoria), etiquetas(h.items)))
  );

  const itemTimeline = (titulo, lugar, inicio, fin, desc) =>
    el("li", {},
      el("span", { class: "timeline__fecha" }, [inicio, fin].filter(Boolean).join(" — ")),
      el("h3", {}, titulo),
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
    certificaciones.forEach((c) =>
      $("#lista-certificaciones").append(
        el("li", {},
          el("strong", {}, c.url ? enlaceExterno(c.url, c.nombre) : c.nombre),
          (c.entidad || c.fecha) && el("span", {}, [c.entidad, c.fecha].filter(Boolean).join(", "))
        )
      )
    );
  }
  lista(perfil.idiomas).forEach((i) =>
    $("#lista-idiomas").append(el("li", {}, el("span", {}, i.idioma), el("span", { class: "nivel" }, i.nivel)))
  );

  /* ---------- Proyectos ---------- */
  const ordenados = [...proyectos].sort(
    (a, b) =>
      (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0) || String(b.fecha || "").localeCompare(String(a.fecha || ""))
  );
  const contProyectos = $("#lista-proyectos");
  const contFiltros = $("#filtros");
  let filtroActivo = "Todos";

  function tarjetaProyecto(p) {
    const media = p.imagen ? el("img", { src: p.imagen, alt: "", loading: "lazy" }) : el("span", {}, iniciales(p.titulo));
    return el("article", { class: "tarjeta proyecto" + (p.destacado ? " proyecto--destacado" : "") },
      el("button", { class: "proyecto__media", "aria-label": `Ver detalles de ${p.titulo}`, onclick: () => abrirProyecto(p) }, media),
      el("div", { class: "proyecto__cuerpo" },
        el("div", { class: "proyecto__cabecera" },
          el("h3", {}, p.titulo),
          p.fecha && el("span", { class: "fecha" }, p.fecha)
        ),
        el("p", {}, p.resumen),
        etiquetas(p.tecnologias, "etiquetas etiquetas--peq"),
        el("div", { class: "proyecto__enlaces" },
          el("button", { class: "enlace", onclick: () => abrirProyecto(p) }, "Detalles"),
          p.repo && enlaceExterno(p.repo, "Código", "enlace"),
          p.demo && enlaceExterno(p.demo, "Demo", "enlace")
        )
      )
    );
  }

  function pintarProyectos() {
    const visibles = ordenados.filter(
      (p) => filtroActivo === "Todos" || lista(p.tecnologias).includes(filtroActivo)
    );
    contProyectos.replaceChildren(
      ...(visibles.length ? visibles.map(tarjetaProyecto) : [el("p", { class: "vacio" }, "Aún no hay proyectos aquí.")])
    );
    contFiltros.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filtro === filtroActivo))
    );
  }

  const tecnologias = [...new Set(proyectos.flatMap((p) => lista(p.tecnologias)))].sort();
  if (proyectos.length > 1 && tecnologias.length > 1) {
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
    const parrafos = lista(p.descripcion).length ? lista(p.descripcion) : [p.resumen];
    $("#modal-contenido").replaceChildren(
      ...[
        p.imagen && el("img", { class: "modal__img", src: p.imagen, alt: "" }),
        el("h3", {}, p.titulo),
        p.fecha && el("p", { class: "fecha" }, p.fecha),
        etiquetas(p.tecnologias, "etiquetas etiquetas--peq"),
        ...parrafos.map((d) => el("p", {}, d)),
        el("div", { class: "botones" },
          p.repo && enlaceExterno(p.repo, "Ver código", "btn"),
          p.demo && enlaceExterno(p.demo, "Ver demo", "btn btn--primario")
        ),
      ].filter(Boolean)
    );
    modal.showModal();
  }
  $("#modal-cerrar").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* ---------- Pie ---------- */
  lista(perfil.redes).forEach((r) => $("#pie-redes").append(el("li", {}, enlaceExterno(r.url, r.nombre))));
  if (perfil.email)
    $("#pie-redes").append(el("li", {}, el("a", { href: `mailto:${perfil.email}` }, "Email")));
  $("#pie-texto").textContent = `© ${new Date().getFullYear()} ${perfil.nombre}`;

  /* ---------- Navegación entre vistas (#, #sobre-mi, #proyectos) ---------- */
  const vistas = [...document.querySelectorAll("main > .vista")];
  const tabs = [...document.querySelectorAll(".tabs a")];
  function mostrarVista() {
    const id = location.hash.slice(1);
    const actual = vistas.some((v) => v.dataset.vista === id) ? id : "inicio";
    vistas.forEach((v) => (v.hidden = v.dataset.vista !== actual));
    tabs.forEach((t) =>
      t.dataset.vista === actual ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current")
    );
    document.body.dataset.vista = actual;
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", mostrarVista);
  mostrarVista();

  /* ---------- Tema claro/oscuro ---------- */
  $("#btn-tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const oscuroActual =
      raiz.dataset.theme === "dark" ||
      (!raiz.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    raiz.dataset.theme = oscuroActual ? "light" : "dark";
    try { localStorage.setItem("tema", raiz.dataset.theme); } catch (e) {}
  });
})();

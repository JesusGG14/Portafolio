/* =========================================================================
   DATOS DEL PORTAFOLIO
   -------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para personalizar la web.
   - Cambia tus datos personales en "perfil".
   - Para SUBIR UN PROYECTO NUEVO, copia un bloque de "proyectos" y edítalo.
     Las imágenes van en assets/img/proyectos/ (opcional).
   ========================================================================= */

window.PORTFOLIO = {
  perfil: {
    nombre: "Tu Nombre Apellido",
    rol: "Desarrollador de Software",
    ubicacion: "Ciudad, España",
    email: "tu.email@ejemplo.com",
    telefono: "", // opcional
    foto: "", // ej: "assets/img/foto.jpg" (si está vacío se muestran tus iniciales)
    cv: "", // ej: "assets/cv/CV.pdf" (si está vacío el botón imprime la página como CV)
    resumen:
      "Desarrollador apasionado por crear software limpio y útil. Me gusta aprender tecnologías nuevas y resolver problemas reales con código.",
    sobreMi: [
      "Escribe aquí quién eres, qué te motiva y cómo empezaste en la informática.",
      "Cuenta en qué tipo de proyectos te gusta trabajar, qué estás aprendiendo ahora y qué buscas profesionalmente.",
    ],
    redes: [
      { nombre: "GitHub", url: "https://github.com/tu-usuario" },
      { nombre: "LinkedIn", url: "https://www.linkedin.com/in/tu-usuario" },
    ],
    idiomas: [
      { idioma: "Español", nivel: "Nativo" },
      { idioma: "Inglés", nivel: "B2" },
    ],
  },

  habilidades: [
    { categoria: "Lenguajes", items: ["JavaScript", "Python", "Java", "SQL"] },
    { categoria: "Frontend", items: ["HTML", "CSS", "React"] },
    { categoria: "Backend", items: ["Node.js", "Express", "Spring Boot"] },
    { categoria: "Herramientas", items: ["Git", "Docker", "Linux", "VS Code"] },
  ],

  experiencia: [
    {
      puesto: "Desarrollador Junior",
      empresa: "Empresa Ejemplo S.L.",
      inicio: "2024",
      fin: "Actualidad",
      descripcion: [
        "Desarrollo de nuevas funcionalidades en una aplicación web.",
        "Mantenimiento de APIs REST y bases de datos.",
      ],
    },
  ],

  formacion: [
    {
      titulo: "Grado / Ciclo en Informática",
      centro: "Universidad o Instituto",
      inicio: "2020",
      fin: "2024",
      descripcion: "Especialidad, proyecto final o asignaturas destacadas.",
    },
  ],

  certificaciones: [
    // { nombre: "Nombre del certificado", entidad: "Entidad", fecha: "2025", url: "" },
  ],

  /* -----------------------------------------------------------------------
     PROYECTOS
     Campos:
       titulo       (obligatorio)
       resumen      (obligatorio) frase corta para la tarjeta
       descripcion  texto largo que se ve al abrir el proyecto (puede tener varios párrafos)
       tecnologias  lista de etiquetas (se usan también para filtrar)
       imagen       ruta a la imagen, ej: "assets/img/proyectos/mi-app.png"
       repo         enlace al código (GitHub...)
       demo         enlace a la demo en vivo
       fecha        ej: "2025"
       destacado    true para mostrarlo primero
     ----------------------------------------------------------------------- */
  proyectos: [
    {
      titulo: "Portafolio personal",
      resumen: "Esta misma web: un currículum interactivo hecho con HTML, CSS y JavaScript.",
      descripcion: [
        "Sitio estático sin dependencias que muestra mi perfil, experiencia y proyectos.",
        "Todo el contenido se carga desde un único archivo de datos, por lo que añadir un proyecto es tan fácil como editar unas líneas.",
      ],
      tecnologias: ["HTML", "CSS", "JavaScript"],
      imagen: "",
      repo: "https://github.com/tu-usuario/Portafolio",
      demo: "",
      fecha: "2026",
      destacado: true,
    },
    {
      titulo: "API de tareas",
      resumen: "API REST para gestionar tareas con autenticación de usuarios.",
      descripcion: [
        "Ejemplo de proyecto: describe el problema que resuelve, cómo lo hiciste y qué aprendiste.",
      ],
      tecnologias: ["Node.js", "Express", "SQL"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2025",
    },
    {
      titulo: "Análisis de datos",
      resumen: "Scripts en Python para limpiar y visualizar un conjunto de datos público.",
      descripcion: ["Ejemplo de proyecto. Sustitúyelo por uno tuyo."],
      tecnologias: ["Python"],
      imagen: "",
      repo: "",
      demo: "",
      fecha: "2024",
    },
  ],
};

/* =========================================================================
   DATOS DEL PORTAFOLIO
   -------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para personalizar la web.
   - Tus datos personales y el currículum están en "perfil", "habilidades",
     "experiencia", "formacion", "certificaciones".
   - Para SUBIR UN PROYECTO NUEVO, copia un bloque de "proyectos" y edítalo.
     Las imágenes van en assets/img/proyectos/ (opcional).
   ========================================================================= */

window.PORTFOLIO = {
  perfil: {
    nombre: "Jesús Gargallo Galindo",
    rol: "Técnico Superior en DAW y DAM · SAP PI/PO",
    ubicacion: "Reus",
    email: "Jesus.gargallo2001@gmail.com",
    telefono: "", // opcional, ej: "646 155 772"
    foto: "assets/img/foto.jpg",
    cv: "assets/cv/CV_Jesus_Gargallo_Galindo.pdf",
    resumen:
      "Desarrollador de aplicaciones web y multiplataforma con experiencia en integraciones SAP PI/PO, desarrollo de aplicaciones y soporte técnico.",
    sobreMi: [
      "Titulado en Desarrollo de Aplicaciones Web (DAW) y Desarrollo de Aplicaciones Multiplataforma (DAM), con experiencia en integraciones SAP PI/PO, desarrollo de aplicaciones y soporte técnico.",
      "Acostumbrado a analizar y resolver incidencias, documentar soluciones y colaborar con equipos y clientes. Perfil responsable, comprometido y orientado al trabajo en equipo.",
    ],
    datosExtra: [{ etiqueta: "Carnet", valor: "Permiso B" }],
    redes: [
      { nombre: "LinkedIn", url: "https://www.linkedin.com/in/jesus-gargallo-galindo" },
      { nombre: "GitHub", url: "https://github.com/JesusGG14" },
    ],
    idiomas: [
      { idioma: "Catalán", nivel: "Nativo" },
      { idioma: "Castellano", nivel: "Nativo" },
      { idioma: "Inglés", nivel: "Nivel medio" },
    ],
  },

  habilidades: [
    {
      categoria: "Desarrollo",
      items: ["Java", "C", "C#", "PHP", "Kotlin", "ABAP", "JavaScript", "HTML", "CSS", "Bootstrap", "Laravel"],
    },
    { categoria: "SAP e integración", items: ["SAP PI/PO", "Adaptador SFTP", "Adaptador SOAP", "Adaptador REST"] },
    {
      categoria: "Bases de datos y herramientas",
      items: ["Oracle", "MySQL", "MongoDB", "Docker", "Android Studio", "WordPress", "PrestaShop"],
    },
    {
      categoria: "Diseño y multimedia",
      items: [
        "Photoshop",
        "Illustrator",
        "Premiere",
        "Painter",
        "Designer",
        "Blender",
        "Modelado 3D",
        "Rigging",
        "Animación",
        "UV mapping (Rizom-UV)",
      ],
    },
  ],

  experiencia: [
    {
      puesto: "Coordinador de tareas y apoyo en producción 3D",
      empresa: "Casa d'Oficis Mas Carandell",
      inicio: "2024",
      fin: "2025",
      descripcion: [
        "Coordinación de tareas y búsqueda de información.",
        "Modelado 3D, texturizado, UV mapping y unwrapping, rigging, animación y edición de vídeo.",
      ],
    },
    {
      puesto: "Técnico / desarrollador SAP PI/PO",
      empresa: "Viewnext",
      inicio: "05/2023",
      fin: "05/2024",
      descripcion: [
        "Desarrollo y mantenimiento de integraciones con adaptadores SFTP, SOAP y REST.",
        "Monitorización, análisis y resolución de incidencias; gestión y documentación en el repositorio del equipo de integración.",
        "Participación en reuniones con clientes para definir integraciones y resolver incidencias.",
      ],
    },
    {
      puesto: "Prácticas de desarrollo web",
      empresa: "Barcelona Dragons · Reus · 283 horas",
      inicio: "05/2021",
      fin: "09/2022",
      descripcion: ["Desarrollo de aplicaciones y mantenimiento de la página web y la tienda online."],
    },
    {
      puesto: "Prácticas de programación",
      empresa: "Doit · Reus · 389 horas",
      inicio: "09/2020",
      fin: "02/2021",
      descripcion: ["Programación de aplicaciones con distintos lenguajes."],
    },
    {
      puesto: "Prácticas de soporte técnico",
      empresa: "Amersam · Reus · 350 horas",
      inicio: "09/2018",
      fin: "06/2019",
      descripcion: ["Uso de Raspberry Pi y colaboración en la resolución de problemas técnicos."],
    },
  ],

  formacion: [
    {
      titulo: "CFGS Desarrollo de Aplicaciones Web (DAW)",
      centro: "INS Baix Camp, Reus",
      inicio: "2021",
      fin: "2024",
    },
    {
      titulo: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
      centro: "INS Baix Camp, Reus",
      inicio: "2019",
      fin: "2020",
      descripcion: "Ciclo finalizado en 2020; 1.º en INS Jaume Huguet, Valls.",
    },
    {
      titulo: "CFGM Sistemas Microinformáticos y Redes",
      centro: "INS Baix Camp, Reus",
      inicio: "2017",
      fin: "2019",
    },
    {
      titulo: "Educación Secundaria Obligatoria",
      centro: "INS Salvador Vilaseca, Reus",
      inicio: "2013",
      fin: "2017",
    },
  ],

  certificaciones: [
    { nombre: "PHP básico", entidad: "OpenWebinars" },
    { nombre: "Cybersecurity Essentials", entidad: "Cisco Networking Academy, Instituto Baix Camp" },
    { nombre: "Certificado en ciberseguridad", entidad: "Cisco" },
    { nombre: "ABAP", entidad: "Viewnext" },
    { nombre: "Creació d'entorns i efectes visuals per a videojocs" },
  ],

  /* -----------------------------------------------------------------------
     PROYECTOS
     Campos:
       titulo       (obligatorio)
       resumen      (obligatorio) frase corta para la tarjeta
       descripcion  texto largo que se ve al abrir el proyecto (varios párrafos)
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
      resumen: "Esta misma web: mi currículum interactivo y escaparate de proyectos.",
      descripcion: [
        "Sitio estático hecho con HTML, CSS y JavaScript, sin dependencias.",
        "Todo el contenido se carga desde un único archivo de datos, así que añadir un proyecto nuevo es tan fácil como editar unas líneas.",
      ],
      tecnologias: ["HTML", "CSS", "JavaScript"],
      imagen: "",
      repo: "https://github.com/JesusGG14/Portafolio",
      demo: "",
      fecha: "2026",
      destacado: true,
    },
    // Copia este bloque para añadir más proyectos:
    // {
    //   titulo: "Nombre del proyecto",
    //   resumen: "Frase corta.",
    //   descripcion: ["Párrafo 1", "Párrafo 2"],
    //   tecnologias: ["Java", "MySQL"],
    //   imagen: "assets/img/proyectos/captura.png",
    //   repo: "https://github.com/JesusGG14/...",
    //   demo: "",
    //   fecha: "2025",
    // },
  ],
};

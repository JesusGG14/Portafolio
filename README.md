# Portafolio / Currículum web

Web personal estática (HTML + CSS + JavaScript, sin dependencias ni compilación) que sirve como currículum informático.

Tiene tres vistas:
- **Inicio** (`#`): presentación y una *bandeja de entrada* con acceso a las secciones.
- **Sobre mí** (`#sobre-mi`): el currículum completo y botón para descargar el CV en PDF.
- **Proyectos** (`#proyectos`): tarjetas de proyectos con filtro por tecnología.

## Características

- Todo el contenido se edita en **un solo archivo**: `data/perfil.js`.
- Proyectos con imagen, tecnologías, enlaces a código y demo, y ventana de detalles.
- Filtro de proyectos por tecnología (se genera solo).
- Tema claro/oscuro automático con botón para cambiarlo.
- Adaptada a móvil.
- **Versión imprimible**: `Ctrl+P` → Guardar como PDF imprime siempre el currículum (vista "Sobre mí").

## Estructura

```
index.html            Estructura de la página
css/styles.css        Estilos
js/main.js            Lógica que pinta los datos
data/perfil.js        ← TUS DATOS Y PROYECTOS
assets/img/           Tu foto y las imágenes de los proyectos
assets/cv/            Tu CV en PDF (opcional)
```

## Personalizar

Abre `data/perfil.js` y cambia los datos de ejemplo por los tuyos (nombre, rol, email, redes, habilidades, experiencia, formación...).

- **Foto**: copia la imagen a `assets/img/foto.jpg` y pon `foto: "assets/img/foto.jpg"`.
- **CV en PDF**: copia el archivo a `assets/cv/CV.pdf` y pon `cv: "assets/cv/CV.pdf"`. Si lo dejas vacío, el botón imprime la web como CV.

## Subir un proyecto nuevo

1. (Opcional) Guarda una captura en `assets/img/proyectos/`, por ejemplo `mi-app.png` (mejor en formato 16:9).
2. En `data/perfil.js`, dentro de `proyectos: [ ... ]`, añade un bloque:

```js
{
  titulo: "Mi App",
  resumen: "Frase corta que aparece en la tarjeta.",
  descripcion: [
    "Primer párrafo con más detalle: qué problema resuelve.",
    "Segundo párrafo: cómo lo hiciste y qué aprendiste.",
  ],
  tecnologias: ["React", "Node.js"],
  imagen: "assets/img/proyectos/mi-app.png",
  repo: "https://github.com/usuario/mi-app",
  demo: "https://mi-app.ejemplo.com",
  fecha: "2026",
  destacado: true, // opcional: lo muestra el primero
},
```

3. Guarda, haz commit y push. La web se actualiza sola si está publicada en GitHub Pages.

## Verla en local

Basta con abrir `index.html` en el navegador. O, si prefieres un servidor:

```bash
python3 -m http.server 8000
# y abre http://localhost:8000
```

## Publicar gratis con GitHub Pages

1. Sube el repositorio a GitHub (la rama con estos archivos debe ser `main` o la que elijas).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Elige la rama y la carpeta `/ (root)` y guarda.
4. En un par de minutos la web estará en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

# 🚀 Portafolio Web Personal | Abraham Pérez

¡Bienvenido al repositorio de mi portafolio web! 

Soy **Abraham Gabriel Perez Ascanio**, un *Semi-casi-programador* apasionado por la tecnología, la lógica algorítmica y la resolución de problemas. Este proyecto es una carta de presentación digital diseñada para mostrar mi historia, mis habilidades técnicas y los proyectos en los que he trabajado.

---

## 📖 Resumen del Proyecto

Este portafolio es una página web estática (Single Page) con un diseño moderno, limpio y completamente responsivo (adaptable a dispositivos móviles y computadoras de escritorio). Está pensado para ser directo y fácil de navegar, utilizando una experiencia de usuario (UX) basada en ventanas desplegables (acordeones) para mantener la información organizada sin saturar la vista.

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando los lenguajes base de la web, sin depender de librerías externas pesadas.

*   **HTML5:** Estructura semántica del portafolio.
*   **CSS3:** Estilos, variables nativas, animaciones suaves (`keyframes`) y diseño responsivo (`Flexbox` / `CSS Grid`).
*   **JavaScript (Vanilla):** Lógica funcional para mejorar la interactividad de los menús desplegables.

---

## 📂 Contenido y Secciones

El portafolio está dividido en secciones estratégicas:

1.  **Cabecera de Perfil:** Foto de perfil, título profesional y botones de contacto directo (WhatsApp y GitHub).
2.  **Historia Personal:** Un espacio dedicado a mi trayectoria, motivaciones y metas en el mundo de la programación.
3.  **Habilidades Técnicas:** Una grilla visual que destaca mis conocimientos en lenguajes (Python), bases de datos (SQL), herramientas (Git/GitHub) y competencias lógicas.
4.  **Mis Proyectos (Acordeón Maestro):** Un menú principal desplegable que contiene internamente los detalles de mis desarrollos (como el *Organizador de Turnos Rotativos*). Incluye un comportamiento exclusivo donde al abrir un proyecto, los demás se cierran automáticamente para una lectura limpia.
5.  **Enlace a GitHub:** Una pestaña destacada para redirigir a los visitantes al código fuente de todos mis proyectos.

---

## 🔄 El Proceso de Creación

Este portafolio fue desarrollado de manera iterativa, mejorando la estructura y el código paso a paso:

1.  **Fase 1 - Plantilla Base:** Se creó un diseño en un solo archivo (HTML+CSS combinados) con variables de color fáciles de modificar y etiquetas `<details>` nativas para los proyectos.
2.  **Fase 2 - Personalización y Ajustes:** Analizamos un código de perfil preexistente e integramos mis datos reales, habilidades y mi botón de contacto de WhatsApp. Se ajustó la sección de proyectos para tener exactamente 5 espacios con descripciones directas.
3.  **Fase 3 - Refinamiento de Interfaz (UX):** Se rediseñó la sección de proyectos para convertirla en una ventana desplegable "maestra" que anida a los demás proyectos, limpiando significativamente la interfaz de la página principal.
4.  **Fase 4 - Modularización y Lógica:** Separamos el código monolítico en tres archivos distintos (`index.html`, `styles.css` y `app.js`) aplicando buenas prácticas de desarrollo. Además, implementamos JavaScript para darle al acordeón de proyectos un comportamiento dinámico y profesional.

---

## 📁 Estructura de Archivos

```text
/
├── index.html     # Estructura principal de la página
├── styles.css     # Hoja de estilos y diseño
├── app.js         # Lógica de interactividad (acordeones)
├── README.md      # Documentación del proyecto
└── mi-foto.jpg    # (Añadir) Imagen de perfil
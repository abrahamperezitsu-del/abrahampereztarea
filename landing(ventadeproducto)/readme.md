# petCO - Landing Page Veterinaria * (HACEN FALTA LOS NODE_MODULE)

## Descripción del Proyecto

`petCO` es una plataforma web tipo *landing page* diseñada para una clínica veterinaria integral. El objetivo principal del proyecto es proporcionar una experiencia de usuario fluida, atractiva y moderna, orientada a la conversión de visitantes en clientes mediante llamadas a la acción directas hacia canales de atención inmediata como WhatsApp.

La interfaz está optimizada para dispositivos móviles y de escritorio, destacando los servicios clínicos, la propuesta de valor (como la certificación en manejo "Fear Free") y los canales de contacto directo.

---

## Tecnologías Utilizadas

* **React.js**: Librería principal para la construcción de la interfaz de usuario basada en componentes reutilizables.
* **Vite**: Herramienta de empaquetado y entorno de desarrollo de alto rendimiento.
* **Tailwind CSS**: Framework CSS orientado a clases de utilidad para el diseño adaptable y personalizado.
* **PostCSS & Autoprefixer**: Herramientas para el procesamiento y compatibilidad entre navegadores.

---

## Arquitectura de Componentes

El proyecto se diseñó bajo una estructura modular dentro del directorio `src/components/`, separando las responsabilidades de la interfaz en los siguientes componentes:

* **Navbar**: Barra de navegación superior con desplazamiento suave a secciones y botón de acceso rápido a emergencias.
* **Hero**: Sección principal con mensaje de impacto y llamada a la acción (*CTA*) vinculada a la reserva de citas por WhatsApp.
* **About**: Presentación de la clínica, filosofía de trabajo e historia.
* **Services**: Cuadrícula interactiva con los servicios ofrecidos, incluyendo una tarjeta destacada para la consulta de trato "Fear Free".
* **Testimonials**: Sección de prueba social con opiniones de clientes.
* **Footer**: Pie de página informativo con dirección, horarios, canales de contacto e integración de redes sociales (Instagram).

---

## Proceso de Desarrollo

El desarrollo del proyecto se ejecutó en las siguientes etapas:

### 1. Definición de Requerimientos y Copywriting
Se estructuró el contenido persuasivo orientado al sector veterinario, priorizando la claridad en los servicios, la confianza del usuario y la facilitación del contacto.

### 2. Maquetación e Interfaz
Se concibió un diseño responsivo utilizando patrones modernos de UI/UX, enfocado en legibilidad, jerarquía visual clara y contraste de colores apto para servicios de salud animal.

### 3. Modularización en React
La estructura inicial de la página se dividió en componentes funcionales e independientes dentro del ecosistema de React, lo que facilita el mantenimiento, la escalabilidad y la reutilización del código.

### 4. Configuración del Entorno y Estilos
Se integró Tailwind CSS junto con PostCSS en la canalización de compilación de Vite, configurando las directivas necesarias en los archivos globales de estilos (`index.css`) y definiendo las rutas de contenido en `tailwind.config.js`.

### 5. Integración de Canales Directos
Se parametrizaron las llamadas a la acción mediante enlaces directos a la API de WhatsApp para agilizar el agendamiento de citas y consultas, así como la actualización de perfiles sociales corporativos en el pie de página.

---

## Instalación y Configuración Local

Para ejecutar este proyecto en un entorno local, siga estos pasos:

1. **Clonar el repositorio o descargar el código fuente**:
   ```bash
   git clone <URL_DEL_REPOSOTORIO>
   cd petco-landing

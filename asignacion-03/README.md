 Sistema de Venta de Entradas - Mundial 2026 🏆

 Descripción del producto y problema que resuelve
Este proyecto es una Landing Page desarrollada en React para el Sistema de Venta de Entradas del Mundial 2026. 
**Problema que resuelve:** Elimina el caos, las filas físicas interminables y los cuellos de botella característicos de la compra presencial tradicional. Permite a los fanáticos del fútbol asegurar su entrada de manera digital, rápida y descentralizada, ofreciendo una experiencia fluida desde cualquier dispositivo.

 Diagrama de Componentes
El proyecto sigue una arquitectura de componentes modular y escalable:

text
App (Componente Contenedor Principal)
 ├── Header (Navegación estática superior)
 ├── Hero Section (Título principal y CTA)
 ├── Features Section (Iteración de datos)
 │    └── FeatureCard (Componente Reutilizable con Props)
 ├── Steps Section (Guía visual de compra)
 └── Footer (Contiene la etiqueta dinámica de scroll)

 Qué le pedí a la IA vs. Qué modifiqué yo
Aportes de la IA:

Código base para la estructura de los componentes en React.

Hoja de estilos global (CSS puro sin librerías) con diseño responsivo, aplicando Flexbox, Grid y tipografías personalizadas.

Lógica del hook useEffect para controlar la visibilidad del banner de descuento basado en la posición del scroll de la ventana.

Mis modificaciones e integraciones técnicas (Trabajo propio):

Gestión del entorno de desarrollo: Diagnóstico y resolución de conflictos del sistema operativo con las variables de entorno (Path) para habilitar la ejecución correcta de npm y Node.js.

Estructuración del proyecto Vite: Integración manual de las piezas generadas por la IA dentro de la arquitectura de Vite, creando la separación correcta entre la lógica de datos (src/data/featuresData.js) y la interfaz (src/components/FeatureCard.jsx).

Debugging y corrección de rutas: Solución del error de lectura ENOENT al apuntar y ejecutar comandos desde el directorio raíz correcto, además de exponer el servidor local en la red.

Configuración de Build y Deploy: Modificación de vite.config.js y adaptación de los scripts en package.json para inyectar la dependencia gh-pages, empaquetar el código de desarrollo y realizar la publicación exitosa en GitHub Pages.
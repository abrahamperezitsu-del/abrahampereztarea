Informe de Desarrollo: Guía Interactiva de Chrome DevTools
Este documento detalla el proceso de diseño, estructuración e implementación utilizado para construir la página web explicativa sobre las herramientas de desarrollo de Google Chrome.

1. Concepto y Objetivos
El objetivo principal fue crear una plataforma educativa visualmente atractiva, ligera e interactiva que sirviera como manual de referencia técnica. Para lograrlo, se optó por una arquitectura de Aplicación de Una Sola Página (SPA, por sus siglas en inglés), lo que permite al usuario navegar entre las diferentes secciones sin sufrir recargas de pantalla ni tiempos de espera.

2. Arquitectura del Proyecto
El proyecto se planteó aplicando el principio de separación de responsabilidades, dividiendo la aplicación en capas claras:

Estructura Base (HTML): Se construyó un marco semántico sencillo en index.html que define la cabecera, la barra lateral de navegación (<aside>) y el contenedor principal (<main>) donde se despliega el contenido dinámico.

Capa de Estilos (CSS): Se utilizó una hoja de estilos centrada en variables CSS (:root). Esto permite gestionar la paleta de colores, márgenes y tipografías desde un único punto del código.

Gestión de Datos (JavaScript): Toda la información explicativa sobre cada pestaña de DevTools se organizó en una estructura de datos basada en un arreglo de objetos JavaScript (devToolsData). Cada objeto almacena la identidad, ícono, título y texto explicativo formateado en HTML.

Lógica de Interacción (JavaScript): Un script controlador se encarga de escuchar los eventos de clic en el menú, gestionar las clases visuales de activación y reemplazar el contenido en pantalla mediante manipulación del DOM.

3. Decisiones de Diseño e Interfaz (UI/UX)
Paleta de Colores en Azul Oscuro: Se eligió una gama de azules oscuros y profundos para el fondo y los paneles primarios. Esta elección responde a dos motivos: reduce significativamente la fatiga visual al leer textos largos y evoca la estética de los entornos de desarrollo integrados (IDE) profesionales.

Jerarquía Visual y Tipografía: Se emplearon fuentes del sistema sin remate para los textos principales y fuentes monoespaciadas para los comandos, etiquetas HTML y funciones. Las secciones críticas se destacaron mediante cajas con bordes luminosos y contraste moderado.

Navegación Fluida: La barra lateral se diseñó para permanecer fija mientras el usuario explora los temas, ofreciendo un acceso directo y permanente a cualquier sección.

4. Implementación Técnica
Para mantener el proyecto accesible e independizarlo de dependencias externas, se trabajó exclusivamente con Vanilla JS (JavaScript puro, sin frameworks como React o Vue).

Durante la fase de construcción:

Se iteró desde una versión básica contenida en un único archivo hacia una estructura modular dividida en componentes (styles.css, data.js, app.js).

Se expandió progresivamente la base de datos técnica para cubrir aspectos avanzados de las herramientas (como el Drawer, Coverage, Performance, Memory y comandos de consola).

Finalmente, se consolidó el código para garantizar que la página pudiera ejecutarse de forma local en cualquier navegador sin bloquearse por políticas de origen de archivos locales (file://).

5. Resultado
El producto final es un documento técnico interactivo, escalable y mantenible. Al estar la información separada del renderizado, cualquier actualización futura sobre la documentación solo requiere editar el arreglo de datos sin alterar la interfaz gráfica.
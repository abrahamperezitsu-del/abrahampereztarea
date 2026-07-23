// BASE DE DATOS TÉCNICA DETALLADA Y COMPLETA DE DEVTOOLS
const devToolsData = [
    {
        id: 'elements',
        icon: '📦',
        title: 'Elements (Elementos y CSS)',
        content: `
            <h2>Panel Elements: Arquitectura, CSS y Eventos</h2>
            <p>Este panel es la representación en vivo del <strong>DOM (Document Object Model)</strong>. Permite inspeccionar, alterar y depurar el HTML y CSS en tiempo real sin modificar los archivos del servidor.</p>

            <h3>1. Inspección y Edición del Árbol DOM</h3>
            <ul>
                <li><strong>Modificación Directa:</strong> Haz doble clic en cualquier texto o atributo para editarlo. Puedes arrastrar y soltar nodos HTML para reorganizar la estructura visual.</li>
                <li><strong>Forzar Estados (:hover, :active, :focus, :focus-visible):</strong> Haz clic derecho en un elemento o usa el botón <code>:hov</code> en la pestaña Styles para activar estados que normalmente requieren interacción del ratón.</li>
                <li><strong>DOM Breakpoints:</strong> Haz clic derecho en un nodo > <em>Break on</em> para pausar la ejecución del código cuando el subárbol cambie (<em>Subtree modifications</em>), cambien sus atributos (<em>Attribute modifications</em>) o el nodo sea eliminado (<em>Node removal</em>).</li>
            </ul>

            <h3>2. Pestaña Styles (Estilos CSS)</h3>
            <ul>
                <li><strong>Cascada y Especificidad:</strong> Muestra todas las reglas CSS aplicadas al elemento seleccionado, ordenadas por especificidad. Las reglas tachadas fueron anuladas por una regla superior más específica.</li>
                <li><strong>Color Picker & Sombras:</strong> Haz clic en el cuadro de color junto a cualquier valor CSS para abrir la paleta con medidor de contraste WCAG, o usa los asistentes visuales para sombras (<code>box-shadow</code>) y animaciones.</li>
                <li><strong>Variables CSS:</strong> Pasa el ratón sobre variables como <code>var(--main-color)</code> para ver su valor actual y el archivo donde se definieron.</li>
            </ul>

            <h3>3. Pestaña Computed (Valores Calculados)</h3>
            <ul>
                <li><strong>Valores Finales:</strong> Resuelve todas las fórmulas y unidades relativas (<code>rem</code>, <code>%</code>, <code>vh</code>) mostrando el valor absoluto en píxeles que renderiza el navegador.</li>
                <li><strong>Visualizador Box Model:</strong> Representación gráfica e interactiva de los márgenes (<em>Margin</em>), bordes (<em>Border</em>), rellenos (<em>Padding</em>) y dimensiones reales (<em>Content</em>). Puedes editar los números directamente en el diagrama.</li>
            </ul>

            <h3>4. Pestañas Layout y Event Listeners</h3>
            <ul>
                <li><strong>Layout (Grid & Flexbox):</strong> Activa superposiciones visuales para ver líneas de cuadrícula, números de pista, nombres de área y alineaciones en layouts complejos, así como inspeccionar <em>Container Queries</em>.</li>
                <li><strong>Event Listeners:</strong> Muestra todos los eventos JavaScript registrados en el nodo (<code>click</code>, <code>keydown</code>, <code>scroll</code>). Activa la opción <em>Ancestors</em> para ver eventos heredados por propagación (bubbling) y haz clic en la referencia para ir directamente a la línea de código que adjuntó el listener.</li>
                <li><strong>Properties:</strong> Inspecciona el objeto JavaScript nativo del nodo DOM seleccionado con todas sus propiedades y métodos de la especificación web.</li>
            </ul>
        `
    },
    {
        id: 'console',
        icon: '💻',
        title: 'Console (Consola y Comandos)',
        content: `
            <h2>Panel Console: Entorno REPL y API de Utilidades</h2>
            <p>Es un entorno interactivo <strong>REPL (Read-Eval-Print Loop)</strong> para ejecutar JavaScript al instante y auditar la salida del sistema.</p>

            <h3>1. Todos los Métodos de Registro (Logging)</h3>
            <ul>
                <li><code>console.log()</code>: Salida de texto estándar.</li>
                <li><code>console.warn()</code> y <code>console.error()</code>: Mensajes destacados en amarillo y rojo con trazo de pila (stack trace).</li>
                <li><code>console.table(datos)</code>: Dibuja arrays u objetos en una tabla estructurada y clasificable.</li>
                <li><code>console.dir(objeto)</code>: Muestra una lista interactiva de las propiedades de un objeto JavaScript.</li>
                <li><code>console.group('Nombre')</code> / <code>console.groupEnd()</code>: Agrupa múltiples logs en un bloque colapsable.</li>
                <li><code>console.time('Timer')</code> / <code>console.timeEnd('Timer')</code>: Mide el tiempo exacto en milisegundos que tarda en ejecutarse el código entre ambas llamadas.</li>
                <li><code>console.count('Etiqueta')</code>: Cuenta cuántas veces se ha ejecutado esa línea de código.</li>
                <li><code>console.assert(condicion, mensaje)</code>: Muestra un error en consola solo si la condición devuelve <code>false</code>.</li>
            </ul>

            <h3>2. API de Utilidades de la Consola (Comandos Especiales)</h3>
            <ul>
                <li><code>$0</code> a <code>$4</code>: <code>$0</code> devuelve el último elemento seleccionado en el panel Elements (<code>$1</code> el penúltimo, y así sucesivamente).</li>
                <li><code>$(selector)</code>: Alias rápido equivalente a <code>document.querySelector()</code>.</li>
                <li><code>$$(selector)</code>: Alias equivalente a <code>Array.from(document.querySelectorAll())</code>.</li>
                <li><code>$_</code>: Devuelve el resultado devuelto por la última expresión evaluada en la consola.</li>
                <li><code>copy(variable)</code>: Copia cualquier valor, objeto o JSON directamente al portapapeles de tu sistema operativo.</li>
                <li><code>monitorEvents(elemento, ['click', 'keydown'])</code>: Imprime en consola en tiempo real todos los eventos que se disparan en ese elemento. Desactívalo con <code>unmonitorEvents()</code>.</li>
                <li><code>clear()</code>: Limpia el historial de la consola (equivalente a <code>Ctrl + L</code>).</li>
            </ul>

            <div class="highlight-box">
                <p><strong>Configuración clave:</strong> Activa <em>Preserve Log</em> en el icono de engranaje para que el historial no se borre cuando la página recarga o cambia de URL.</p>
            </div>
        `
    },
    {
        id: 'sources',
        icon: '📁',
        title: 'Sources (Depurador Avanzado)',
        content: `
            <h2>Panel Sources: Depuración y Flujo de Trabajo</h2>
            <p>Permite examinar el código fuente original, pausar la ejecución en puntos específicos y modificar archivos al vuelo.</p>

            <h3>1. Tipos de Breakpoints (Puntos de Interrupción)</h3>
            <ul>
                <li><strong>Line Breakpoint:</strong> Haz clic en el número de línea para congelar la página antes de que se ejecute esa instrucción.</li>
                <li><strong>Conditional Breakpoint:</strong> Clic derecho en el número de línea > <em>Add conditional breakpoint</em>. La ejecución solo se detiene si la condición JS evalúa a <code>true</code> (ej. <code>i === 100</code>).</li>
                <li><strong>Logpoint:</strong> Imprime un mensaje en la consola cuando pasa por esa línea sin pausar la ejecución de la app (ideal para producción donde no puedes modificar el código fuente).</li>
                <li><strong>XHR/Fetch Breakpoints:</strong> Pausa el código en el instante exacto en que se envía una petición HTTP que contenga una palabra clave en su URL.</li>
                <li><strong>Event Listener Breakpoints:</strong> En la barra lateral derecha, marca opciones como <em>Mouse > click</em> para pausar el código cada vez que se haga clic en cualquier parte de la web.</li>
            </ul>

            <h3>2. Controles de Control de Flujo del Depurador</h3>
            <ul>
                <li><strong>Resume (F8):</strong> Reanuda la ejecución normal del código hasta el siguiente breakpoint.</li>
                <li><strong>Step Over (F10):</strong> Ejecuta la siguiente línea de código sin entrar dentro de las funciones que contenga.</li>
                <li><strong>Step Into (F11):</strong> Entra dentro de la función que se va a ejecutar en esa línea.</li>
                <li><strong>Step Out (Shift + F11):</strong> Sale de la función actual y vuelve a la función que la llamó.</li>
            </ul>

            <h3>3. Paneles de Inspección y Herramientas Especiales</h3>
            <ul>
                <li><strong>Scope & Call Stack:</strong> Inspecciona todas las variables locales, de closure y globales activas en el instante de la pausa, y revisa el historial de llamadas de funciones.</li>
                <li><strong>Local Overrides:</strong> Te permite editar archivos JS o CSS en DevTools y guardarlos localmente en tu disco duro para que tus cambios persistan incluso tras recargar la página.</li>
                <li><strong>Snippets:</strong> Scripts de JavaScript reutilizables que puedes guardar en el navegador y ejecutar en cualquier sitio web.</li>
            </ul>
        `
    },
    {
        id: 'network',
        icon: '🌐',
        title: 'Network (Tráfico de Red)',
        content: `
            <h2>Panel Network: Auditoría de Red e Intercambio de Datos</h2>
            <p>Inspecciona cada recurso descargado o subido por la página web con métricas detalladas de tiempo y transferencias.</p>

            <h3>1. Filtros y Columnas de la Tabla</h3>
            <ul>
                <li><strong>Categorías:</strong> Filtra por <em>Fetch/XHR</em> (llamadas a APIs), <em>JS</em>, <em>CSS</em>, <em>Img</em>, <em>Media</em>, <em>Font</em>, <em>Doc</em> o <em>WS</em> (WebSockets).</li>
                <li><strong>Status:</strong> Códigos de respuesta HTTP (200 Exitoso, 301/302 Redirección, 404 No Encontrado, 500 Error de Servidor).</li>
                <li><strong>Initiator:</strong> Muestra el archivo y la línea de código exactos que desencadenaron la petición HTTP.</li>
            </ul>

            <h3>2. Pestañas de Detalle de una Petición</h3>
            <ul>
                <li><strong>Headers:</strong> Muestra la dirección URL, el método HTTP (GET, POST, PUT, DELETE), los encabezados de respuesta y de solicitud (mantenimiento de sesión, autorización Bearer Tokens, User-Agent).</li>
                <li><strong>Payload:</strong> Los datos pasados como argumentos de URL (Query String) o el cuerpo enviado en formato JSON/Form-Data en peticiones de escritura.</li>
                <li><strong>Preview & Response:</strong> Vista previa renderizada (para imágenes o JSON estructurado) y el texto de respuesta devuelto por el servidor.</li>
                <li><strong>Timing (Waterfall):</strong> Desglose del tiempo total: <em>Queueing</em> (espera), <em>DNS Lookup</em>, <em>Initial Connection/SSL</em>, <em>TTFB (Time to First Byte)</em> y <em>Content Download</em>.</li>
            </ul>

            <h3>3. Simulación de Red y Herramientas</h3>
            <ul>
                <li><strong>Throttling:</strong> Simula velocidades de red como <em>Fast 3G</em>, <em>Slow 3G</em> u <em>Offline</em> para comprobar cómo reacciona tu web ante malas conexiones.</li>
                <li><strong>Disable Cache:</strong> Evita que los archivos estáticos se carguen desde el disco local para forzar peticiones limpias al servidor.</li>
                <li><strong>Block Request URLs:</strong> Permite bloquear dominios o scripts específicos (ej. scripts de analíticas o anuncios) para analizar cómo funciona la página sin ellos.</li>
                <li><strong>Exportar HAR:</strong> Guarda un archivo <code>.har</code> con todo el registro de red para compartirlo con otros desarrolladores.</li>
            </ul>
        `
    },
    {
        id: 'application',
        icon: '💾',
        title: 'Application (Almacenamiento)',
        content: `
            <h2>Panel Application: Persistencia y PWA</h2>
            <p>Gestiona todos los recursos guardados localmente en el navegador del cliente y la configuración de aplicaciones web progresivas (PWA).</p>

            <h3>1. Almacenamiento Web (Web Storage)</h3>
            <ul>
                <li><strong>Local Storage:</strong> Clave-valor en texto (~5MB a 10MB) que persiste indefinidamente hasta que el usuario o un script lo elimine explicitamente.</li>
                <li><strong>Session Storage:</strong> Datos almacenados en memoria que se eliminan en el instante en que se cierra la pestaña.</li>
                <li><strong>Cookies:</strong> Pequeños fragmentos de texto enviados al servidor en cada petición. Puedes inspeccionar sus flags de seguridad: <code>HttpOnly</code> (inaccesible por JS), <code>Secure</code> (solo HTTPS) y <code>SameSite</code> (protección CSRF).</li>
            </ul>

            <h3>2. Bases de Datos y Caché Avanzada</h3>
            <ul>
                <li><strong>IndexedDB:</strong> Base de datos transaccional NoSQL integrada en el navegador para almacenar grandes volúmenes de datos estructurados. Puedes explorar sus índices y realizar búsquedas manualmente.</li>
                <li><strong>Cache Storage:</strong> Almacena pares de Petición/Respuesta HTTP gestionados por Service Workers para ofrecer soporte offline.</li>
            </ul>

            <h3>3. Aplicación y Service Workers</h3>
            <ul>
                <li><strong>Manifest:</strong> Comprueba el archivo <code>manifest.json</code> (iconos, color de tema, pantalla de inicio) para la instalación de PWAs.</li>
                <li><strong>Service Workers:</strong> Muestra el ciclo de vida del Service Worker activo. Puedes forzar la actualización al recargar (<em>Update on reload</em>), simular notificaciones Push o desregistrarlos (<em>Unregister</em>).</li>
                <li><strong>Clear Site Data:</strong> Borra la caché, cookies, Local Storage e IndexedDB de un solo clic para restablecer el sitio a su estado original.</li>
            </ul>
        `
    },
    {
        id: 'performance',
        icon: '⚡',
        title: 'Performance & Métricas',
        content: `
            <h2>Panel Performance: Análisis de Rendimiento y Fluidez</h2>
            <p>Mide los tiempos de ejecución del motor de la página para erradicar tirones visuales y optimizar el tiempo de carga.</p>

            <h3>1. Análisis del Main Thread (Hilo Principal)</h3>
            <p>JavaScript se ejecuta en un solo hilo. Este panel genera un diagrama de llama (Flame Chart) con las tareas procesadas:</p>
            <ul>
                <li><strong>Long Tasks (Tareas Largas):</strong> Toda tarea que supere los 50ms se marca con una esquina roja. Durante ese tiempo, la página está "congelada" para el usuario.</li>
                <li><strong>Desglose de Actividad:</strong> Muestra en gráficos de pastel el tiempo dedicado a <em>Loading</em>, <em>Scripting</em> (JS), <em>Rendering</em> (cálculo de layout) y <em>Painting</em> (dibujado de píxeles).</li>
            </ul>

            <h3>2. Métricas de Core Web Vitals</h3>
            <ul>
                <li><strong>LCP (Largest Contentful Paint):</strong> Mide cuándo se ha dibujado el bloque de contenido o imagen más grande en pantalla (objetivo: < 2.5s).</li>
                <li><strong>CLS (Cumulative Layout Shift):</strong> Mide la estabilidad visual detectando si los elementos se mueven inesperadamente mientras la página carga.</li>
                <li><strong>INP (Interaction to Next Paint):</strong> Evalúa la latencia de respuesta de la página cuando el usuario hace clic o presiona una tecla.</li>
            </ul>
        `
    },
    {
        id: 'memory',
        icon: '🧠',
        title: 'Memory (Diagnóstico de Fugas)',
        content: `
            <h2>Panel Memory: Profiler de Memoria y Heap</h2>
            <p>Diagnostica fugas de memoria (<em>Memory Leaks</em>) que provocan que la web consuma cada vez más memoria RAM hasta colapsar.</p>

            <h3>1. Heap Snapshot (Captura de Memoria)</h3>
            <p>Toma una foto instantánea del uso de memoria en el montón (Heap) de JavaScript:</p>
            <ul>
                <li><strong>Shallow Size vs. Retained Size:</strong> <em>Shallow Size</em> es la memoria del objeto en sí; <em>Retained Size</em> es la memoria liberada si ese objeto y sus hijos son eliminados por el recolector de basura (Garbage Collector).</li>
                <li><strong>Detached DOM Elements (Nodos Descolgados):</strong> Ocurre cuando eliminas un elemento del HTML con JavaScript, pero alguna variable sigue haciendo referencia a él en el código, impidiendo que la memoria se libere.</li>
            </ul>

            <h3>2. Allocation Instrumentation on Timeline</h3>
            <p>Muestra un gráfico en tiempo real con barras azules (memoria asignada activa) y grises (memoria asignada y posteriormente liberada) para detectar acumulaciones sospechosas en bucles o animaciones.</p>
        `
    },
    {
        id: 'lighthouse',
        icon: '🏆',
        title: 'Lighthouse & Security',
        content: `
            <h2>Panel Lighthouse y Auditorías de Seguridad</h2>
            <p>Audita automáticamente la calidad global del sitio según las mejores prácticas dictadas por Google.</p>

            <h3>1. Auditorías Automatizadas con Lighthouse</h3>
            <p>Genera reportes con puntuaciones del 0 al 100 evaluando 5 pilares:</p>
            <ul>
                <li><strong>Performance:</strong> Mide tiempos de respuesta, archivos pesados y bloqueos de renderizado.</li>
                <li><strong>Accessibility (A11y):</strong> Evalúa etiquetas alt en imágenes, contraste de color, estructura de encabezados y atributos ARIA.</li>
                <li><strong>Best Practices:</strong> Revisa el uso de HTTPS, bibliotecas vulnerables y sintaxis obsoleta.</li>
                <li><strong>SEO:</strong> Verifica metaetiquetas, estructuración de texto e indexabilidad para motores de búsqueda.</li>
            </ul>

            <h3>2. Panel Security</h3>
            <ul>
                <li><strong>Certificados SSL/TLS:</strong> Muestra la validez del certificado HTTPS y el emisor.</li>
                <li><strong>Contenido Mixto (Mixed Content):</strong> Detecta si una página HTTPS está intentando cargar recursos inseguros mediante HTTP (imágenes, scripts o peticiones), lo cual bloquea el navegador por seguridad.</li>
            </ul>
        `
    },
    {
        id: 'drawer',
        icon: '🧰',
        title: 'Drawer (Herramientas Ocultas)',
        content: `
            <h2>El Drawer: Herramientas Ocultas de DevTools</h2>
            <p>El <strong>Drawer</strong> es un panel inferior auxiliar que se abre o cierra presionando la tecla <code>ESC</code> desde cualquier sección de las DevTools.</p>

            <h3>1. Herramienta Coverage (Cobertura de Código)</h3>
            <p>Inicia un registro para analizar cuánto código de tus archivos CSS y JS se ejecuta realmente. Muestra líneas en verde (ejecutadas) y en rojo (no ejecutadas) para ayudarte a eliminar CSS o JS innecesario que ralentiza la carga.</p>

            <h3>2. Herramienta Rendering (Renderizado y Emulación)</h3>
            <ul>
                <li><strong>Paint Flashing:</strong> Resalta en verde las regiones de la pantalla que se están volviendo a pintar en tiempo real.</li>
                <li><strong>Emular Deficiencias Visuales:</strong> Simula cómo ven tu sitio web usuarios con daltonismo (protanopia, deuteranopia) o visión borrosa.</li>
                <li><strong>Forzar prefers-color-scheme:</strong> Prueba cómo se adapta tu web al modo oscuro o claro del sistema operativo sin cambiar la configuración de tu computadora.</li>
            </ul>

            <h3>3. Herramienta Sensors (Geolocalización y Acelerómetro)</h3>
            <p>Permite falsear las coordenadas GPS de tu navegador para probar cómo reacciona la web si estás en Tokio, Londres o Nueva York, además de emular la inclinación del giroscopio de un teléfono móvil.</p>

            <h3>4. Herramientas Animations & Changes</h3>
            <ul>
                <li><strong>Animations:</strong> Captura animaciones CSS en vivo y te permite ralentizarlas al 25% o 10% de su velocidad para ajustar sus curvas de tiempo (Bezier curves) fotograma a fotograma.</li>
                <li><strong>Changes:</strong> Muestra una vista comparativa tipo <code>git diff</code> con todas las modificaciones temporales de código CSS y JS que has probado dentro de DevTools.</li>
            </ul>
        `
    }
];s
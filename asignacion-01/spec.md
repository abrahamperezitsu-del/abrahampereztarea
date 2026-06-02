# Especificación Técnica del Proyecto: Sistema de Tickets - FIFA World Cup 2026
**Estudiante:** Abraham Perez  
**Materia/Proyecto:** Desarrollo Web / Sistema de Simulación de Facturación en Taquilla  

---

## 1. Descripción del Proyecto
Este proyecto consiste en una aplicación web interactiva y responsiva diseñada para simular un sistema de compra y preventa de boletos para las fases finales de la Copa Mundial de la FIFA 2026. La interfaz implementa un flujo dinámico que abarca desde la selección de entradas generales hasta la asignación de asientos VIP exclusivos, cálculos de facturación en tiempo real con cupones de descuento, restricciones estrictas de seguridad de datos y la generación automática de un localizador digital para retiro en taquilla física.

## 2. Arquitectura de Software y Tecnologías
La aplicación fue desarrollada bajo la arquitectura estándar de desarrollo frontend nativo, garantizando un rendimiento óptimo sin dependencias externas pesadas:
* **HTML5:** Estructuración semántica de la página, formularios de pago y contenedores modales para alertas.
* **CSS3:** Diseño visual adaptativo (Responsive Design), tipografías personalizadas y uso de variables CSS para la paleta de colores corporativa (Cyberpunk / Deportivo).
* **JavaScript (ES6+):** Motor lógico de la aplicación. Manejo del DOM en tiempo real, gestión de estados del carrito, validación de expresiones regulares (Regex) y simulación de procesamiento de datos orientada a objetos.

---

## 3. Desglose de Funciones Principales (JavaScript)

* **`renderizarEntradas()` / `cambiarCantidad()`**: Controladores dinámicos que inyectan el stock disponible de partidos (Cuartos, Semifinal, Final). Validan en tiempo real que el usuario no exceda el límite máximo de inventario disponible por encuentro.
* **`renderizarAsientos()` / `alternarAsiento()`**: Renderizador del mapa interactivo de 18 butacas VIP. Implementa lógica de validación cruzada: impide seleccionar asientos VIP si no se ha elegido previamente una entrada general, y restringe el número de asientos al número total de pases generales comprados.
* **`actualizarResumen()` / `aplicarDescuento()`**: Centralizador financiero que calcula subtotales y totales. Escucha la inserción del cupón promocional activo (`ESTUDIANTE15`) para deducir de forma exacta el 15% del monto bruto acumulado.
* **`simularCompra()`**: Validador del formulario de facturación. Aplica restricciones nativas: impide procesar si los campos están vacíos, valida que la C.I. y la tarjeta tengan un mínimo de 8 caracteres numéricos y purga caracteres especiales en tiempo real. 
* **Generador de Token de Taquilla (Actualización)**: Integrado en el cierre del proceso. Calcula matemáticamente mediante `Math.random()` un localizador numérico único de 6 dígitos que actúa como clave de acceso simulada para el cliente en los puntos de validación del estadio.
* **`iniciarContador()`**: Hilo de ejecución temporal (`setInterval`) que gestiona una cuenta regresiva de 15 minutos para simular la expiración de la reserva y presionar al usuario en la experiencia de preventa.

---

## 4. Historial de Tareas Desglosadas por la IA (Bitácora de Desarrollo)

A continuación se detalla la secuencia cronológica de requerimientos y tareas técnicas estructuradas y ejecutadas mediante asistencia de Inteligencia Artificial para el cumplimiento de los parámetros académicos:

| Fase | Tarea Técnica Realizada | Objetivo Técnico | Estado |
| :--- | :--- | :--- | :--- |
| **Fase 1** | Estructuración del login e inputs nativos | Crear pantalla de acceso simulado a la ticketera de la FIFA. | Completado |
| **Fase 2** | Adaptación de fuentes y tipografías | Habilitar el uso libre de letras minúsculas y mayúsculas en la sección "Comunidad" según parámetros visuales. | Completado |
| **Fase 3** | Ajuste de Layout y Estilo de Fondo | Corregir la propiedad de escala de la imagen de fondo para que se contenga adecuadamente en el contenedor y no desborde la pantalla completa. | Completado |
| **Fase 4** | Remoción de Campos Sensibles de Pago | Modificar el formulario de pago con tarjeta quitando campos críticos internacionales (CVV, MM/AA) y adaptando la facturación a parámetros locales simplificados. | Completado |
| **Fase 5** | Restricciones numéricas y validación en tiempo real | Implementar filtros numéricos con expresiones regulares en los eventos `input` de C.I. y tarjetas para bloquear letras y caracteres extraños de forma inmediata. | Completado |
| **Fase 6** | Implementación del Módulo de Alertas Personalizadas | Sustituir las alertas nativas del navegador (`alert()`) por ventanas modales dinámicas con bordes de color neón adaptativos (Verde para éxito, Rosado para error). | Completado |
| **Fase 7** | Generador de Clave de Acceso Aleatoria en Taquilla | Desarrollar algoritmo numérico al azar de 6 dígitos para desplegarlo en un recuadro destacado dentro de la alerta de éxito, simulando un código de retiro real. | Completado |
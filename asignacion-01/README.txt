========================================================================
SISTEMA DE VENTA DE ENTRADAS SIMULADO - FIFA WORLD CUP 2026
========================================================================

1. RESUMEN DEL PROYECTO
------------------------------------------------------------------------
Este proyecto es una plataforma web interactiva y responsiva diseñada para 
simular el proceso de preventa y adquisición de entradas para las fases 
finales de la Copa Mundial de la FIFA 2026 (Cuartos de final, Semifinales 
y la Gran Final). 

La interfaz ofrece una experiencia de usuario inmersiva que combina un 
estilo visual cyberpunk/deportivo dinámico (utilizando contrastes en negro 
puro, verde neón y rosa eléctrico) con un flujo de negocio realista, 
aplicando validaciones cruzadas estrictas en el lado del cliente (Frontend) 
para garantizar la consistencia de los datos antes de completar una transacción.

2. ARQUITECTURA Y MÓDULOS DE LA PÁGINA
------------------------------------------------------------------------
El sistema está estructurado de forma modular en cuatro archivos principales:

* index.html (Página de Acceso): 
  Controla el ingreso del usuario mediante un formulario de credenciales. 
  Previene accesos con campos vacíos y redirige de forma segura a la sección 
  principal utilizando ventanas emergentes personalizadas embebidas en el DOM.

* tickets.html (Panel de Compra Principal): 
  Dispone la interfaz de usuario en un diseño de dos columnas (Layout). 
  La columna izquierda gestiona la selección de partidos y el mapa interactivo 
  de asientos VIP. La columna derecha actúa como un contenedor fijo (Sticky) 
  del carrito de compras, capturando datos sensibles y mostrando totales en 
  tiempo real. Incluye un botón inferior de retorno seguro.

* estilos.css (Hoja de Estilos Global): 
  Centraliza el diseño visual mediante Variables CSS (--accent-neon, --accent-pink). 
  Implementa animaciones fluidas (@keyframes popIn) para los modales, grillas 
  adaptables (Grid y bloques fluidos) y un fondo geométrico interactivo basado 
  en gradientes radiales que restringen las imágenes sin saturar la pantalla.

* app.js (Motor de Lógica y Reglas de Negocio): 
  Controla el estado global de la aplicación (Carrito, asientos, descuentos). 
  Manipula dinámicamente el DOM para dibujar, modificar o limpiar elementos 
  en tiempo real sin necesidad de refrescar la ventana del navegador.

3. REGLAS DE NEGOCIO E IMPLEMENTACIÓN DEL CÓDIGO
------------------------------------------------------------------------
El código fue pensado bajo un paradigma funcional y reactivo en JavaScript, 
donde cada cambio en la interfaz actualiza un estado centralizado (`carrito`) 
y redispara las funciones de renderizado de forma inmediata.

Las lógicas clave implementadas son:

A. Restricción Cruzada de Asientos VIP:
   - Para poder seleccionar un asiento del mapa VIP, el usuario obligatoriamente 
     debe poseer al menos una entrada general para algún partido en su carrito.
   - El número de asientos seleccionables está limitado estrictamente por el 
     número de entradas adquiridas. Si un usuario tiene 2 entradas, el software 
     bloquea la selección de un tercer asiento, arrojando una alerta contextual.

B. Saneamiento y Filtrado de Datos en Tiempo Real:
   - Los campos de C.I. (Cédula de Identidad) y Número de Tarjeta escuchan el 
     evento 'input'. Mediante Expresiones Regulares (RegEx: /[^0-9]/g), el código 
     elimina instantáneamente cualquier letra o carácter especial que el usuario 
     intente tipear, permitiendo únicamente dígitos numéricos.

C. Validación de Longitud Mínima y Errores Inline:
   - Al presionar "Simular Compra", el sistema valida que los campos de C.I. 
     y Tarjeta no estén vacíos, contengan solo números y posean una longitud 
     mínima obligatoria de 8 dígitos.
   - Si la validación falla (o el carrito está en $0), la aplicación reutiliza 
     un contenedor intermedio del DOM, mutando su texto y estilo a un color rosa 
     de advertencia con el mensaje: "Debe rellenar todos los campos".

D. Ventanas Emergentes Polimórficas (Modales):
   - En lugar de usar la alerta nativa del navegador (`alert()`), se diseñó un 
     modal personalizado que cambia sus propiedades estéticas según el contexto. 
     Si la operación es un fallo, adopta un borde rosa; si es un éxito, adopta 
     un borde verde neón y modifica dinámicamente los títulos de confirmación.

4. CÓMO FUNCIONA EL FLUJO DE COMPRA
------------------------------------------------------------------------
1. El usuario inicia sesión desde 'index.html' y es redirigido a 'tickets.html'.
2. Se inicia un temporizador regresivo automático de 15 minutos en el encabezado.
3. El usuario añade pases generales mediante los botones (+/-). El subtotal 
   se calcula dinámicamente.
4. Una vez añadidas las entradas, el mapa de asientos VIP se desbloquea para su uso.
5. El usuario puede introducir el cupón 'ESTUDIANTE15' para aplicar una reducción 
   automática del 15% sobre el total acumulado.
6. En la tarjeta de resumen, se deben digitar obligatoriamente la C.I. y la Tarjeta.
7. Al hacer clic en "Simular Compra", si todo es válido, el sistema procesa los 
   datos de forma simulada en memoria y despliega el modal verde de éxito.
========================================================================
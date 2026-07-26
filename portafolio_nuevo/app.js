/**
 * app.js
 * Archivo principal de funciones lógicas para el portafolio.
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeonProyectos();
});

/**
 * Función para hacer que los proyectos funcionen como un acordeón exclusivo.
 * Si abres un proyecto, los demás se cierran automáticamente.
 */
function inicializarAcordeonProyectos() {
    // Seleccionamos todos los proyectos individuales dentro de la lista
    const proyectos = document.querySelectorAll('.proyecto-item');

    proyectos.forEach((proyectoAbierto) => {
        proyectoAbierto.addEventListener('toggle', (evento) => {
            // Si el proyecto se está abriendo...
            if (proyectoAbierto.open) {
                // ...buscamos todos los demás y los cerramos
                proyectos.forEach((otroProyecto) => {
                    if (otroProyecto !== proyectoAbierto && otroProyecto.open) {
                        otroProyecto.open = false;
                    }
                });
            }
        });
    });
}
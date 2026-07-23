// Este script asume que la variable 'devToolsData' ya existe 
// porque cargamos 'data.js' primero en el archivo HTML.

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Obtener referencias del DOM
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    // 2. Función principal para generar el menú lateral
    function initNavigation() {
        devToolsData.forEach((modulo, index) => {
            // Crear el botón
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            
            // Inyectar ícono y texto
            btn.innerHTML = `<span>${modulo.icon}</span> ${modulo.title}`;
            
            // Asignar el primer elemento como activo por defecto
            if (index === 0) {
                btn.classList.add('active');
            }

            // Escuchar el evento click
            btn.addEventListener('click', () => {
                // Remover la clase 'active' de todos los botones
                document.querySelectorAll('.nav-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // Agregar 'active' al botón seleccionado
                btn.classList.add('active');
                
                // Llamar a la función que dibuja el contenido
                renderizarModulo(modulo.id);
            });

            sidebar.appendChild(btn);
        });
    }

    // 3. Función para renderizar el contenido en la tarjeta principal
    function renderizarModulo(idBuscado) {
        // Encontrar los datos del módulo en nuestro array
        const info = devToolsData.find(item => item.id === idBuscado);
        
        if (info) {
            // Crear el contenedor animado e inyectar el HTML de data.js
            mainContent.innerHTML = `
                <article class="content-card">
                    ${info.content}
                </article>
            `;
        }
    }

    // 4. Arrancar la aplicación
    initNavigation();
    
    // Cargar automáticamente el primer panel al abrir la web
    renderizarModulo(devToolsData[0].id);

});
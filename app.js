// === DATOS DE ENTRADA MOCK ===
const entradasMock = [
    { id: 'cuartos', nombre: 'Cuartos de Final', precio: 150, cupo: 10 },
    { id: 'semi', nombre: 'Semifinales', precio: 320, cupo: 5 },
    { id: 'final', nombre: 'Gran Final', precio: 650, cupo: 2 }
];

// Generación estática de 18 asientos VIP
const asientosMock = Array.from({ length: 18 }, (_, i) => ({
    id: `A${i + 1}`,
    precio: 180,
    estado: Math.random() > 0.85 ? 'ocupado' : 'libre'
}));

let carrito = { entradas: {}, asientos: [] };
let descuentoAplicado = false;
const CODIGO_VALIDO = 'ESTUDIANTE15';

// === VENTANA EMERGENTE INTEGRADA DINÁMICA ===
function lanzarAlertaPersonalizada(mensaje, esExito = false) {
    const contenedor = document.getElementById('modal-contenedor');
    const titulo = document.getElementById('alert-title');
    
    if (esExito) {
        contenedor.style.borderColor = "var(--accent-neon)";
        contenedor.style.boxShadow = "12px 12px 0px var(--accent-pink)";
        titulo.innerText = "¡PROCESO EXITOSO!";
        titulo.style.color = "var(--accent-neon)";
    } else {
        contenedor.style.borderColor = "var(--accent-pink)";
        contenedor.style.boxShadow = "12px 12px 0px var(--accent-neon)";
        titulo.innerText = "ERROR EN LA OPERACIÓN";
        titulo.style.color = "var(--accent-pink)";
    }
    
    document.getElementById('alert-message').innerHTML = mensaje;
    document.getElementById('custom-alert').style.display = 'flex';
}

function cerrarAlerta() {
    document.getElementById('custom-alert').style.display = 'none';
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    renderizarEntradas();
    renderizarAsientos();
    actualizarResumen();
    iniciarContador();

    // Restricción: Impide escribir caracteres no numéricos en tiempo real
    document.getElementById('ci-cliente').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    document.getElementById('tarjeta-cliente').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// === COMPONENTE ENTRADAS DE PARTIDOS ===
function renderizarEntradas() {
    const contenedor = document.getElementById('lista-entradas');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    entradasMock.forEach(entrada => {
        if (!carrito.entradas[entrada.id]) carrito.entradas[entrada.id] = 0;

        const div = document.createElement('div');
        div.className = 'entrada-card';
        div.innerHTML = `
            <div>
                <h3>${entrada.nombre}</h3>
                <p>$${entrada.precio} USD — Disponibles: <span>${entrada.cupo}</span></p>
                <span class="mensaje-error" id="error-${entrada.id}"></span>
            </div>
            <div class="controles-cantidad">
                <button onclick="cambiarCantidad('${entrada.id}', -1)">-</button>
                <span style="font-weight: bold; font-size: 1.2rem;">${carrito.entradas[entrada.id]}</span>
                <button onclick="cambiarCantidad('${entrada.id}', 1)">+</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function cambiarCantidad(id, delta) {
    const entrada = entradasMock.find(e => e.id === id);
    const nuevaCantidad = carrito.entradas[id] + delta;

    if (document.getElementById(`error-${id}`)) {
        document.getElementById(`error-${id}`).innerText = ""; 
    }

    if (nuevaCantidad < 0) return; 
    if (nuevaCantidad > entrada.cupo) {
        document.getElementById(`error-${id}`).innerText = "Cupo máximo de stock superado";
        return;
    }

    carrito.entradas[id] = nuevaCantidad;
    renderizarEntradas(); 
    actualizarResumen();
}

// === COMPONENTE MAPA DE ASIENTOS VIP ===
function renderizarAsientos() {
    const contenedor = document.getElementById('mapa-asientos');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    asientosMock.forEach(asiento => {
        const btn = document.createElement('button');
        btn.innerText = asiento.id; 
        
        if (asiento.estado === 'ocupado') {
            btn.className = 'asiento ocupado';
            btn.disabled = true;
        } else {
            const estaSeleccionado = carrito.asientos.includes(asiento.id);
            btn.className = `asiento libre ${estaSeleccionado ? 'seleccionado' : ''}`;
            btn.onclick = () => alternarAsiento(asiento.id);
        }
        contenedor.appendChild(btn);
    });
}

function alternarAsiento(id) {
    let totalEntradasSeleccionadas = Object.values(carrito.entradas).reduce((a, b) => a + b, 0);
    
    if (totalEntradasSeleccionadas === 0) {
        lanzarAlertaPersonalizada("REQUISITO OBLIGATORIO:<br>Para reservar asientos VIP, debes seleccionar primero al menos una entrada para los partidos.");
        return;
    }
    
    const yaMarcado = carrito.asientos.includes(id);
    
    if (!yaMarcado && carrito.asientos.length >= totalEntradasSeleccionadas) {
        lanzarAlertaPersonalizada(`NÚMERO DE ASIENTOS COMPROMETIDO:<br>Solo has seleccionado ${totalEntradasSeleccionadas} entrada(s). No puedes marcar más asientos VIP que tus pases generales.`);
        return;
    }

    if (yaMarcado) {
        carrito.asientos = carrito.asientos.filter(a => a !== id);
    } else {
        carrito.asientos.push(id);
    }
    renderizarAsientos();
    actualizarResumen();
}

// === RESUMEN GENERAL ===
function actualizarResumen() {
    const listaCarrito = document.getElementById('lista-carrito');
    const estadoVacio = document.getElementById('estado-vacio');
    if(!listaCarrito || !estadoVacio) return;
    
    listaCarrito.innerHTML = '';
    let subtotal = 0;
    let hayItems = false;

    entradasMock.forEach(entrada => {
        const cant = carrito.entradas[entrada.id];
        if (cant > 0) {
            hayItems = true;
            subtotal += cant * entrada.precio;
            listaCarrito.innerHTML += `<li><span>${cant}x ${entrada.nombre}</span> <span>$${cant * entrada.precio}</span></li>`;
        }
    });

    carrito.asientos.forEach(id => {
        hayItems = true;
        const asiento = asientosMock.find(a => a.id === id);
        subtotal += asiento.precio;
        listaCarrito.innerHTML += `<li><span>Asiento ${id} (VIP)</span> <span>$${asiento.precio}</span></li>`;
    });

    if (hayItems) {
        estadoVacio.style.display = 'none';
    } else {
        estadoVacio.style.display = 'block';
        estadoVacio.style.color = '#888';
        estadoVacio.style.fontWeight = 'normal';
        estadoVacio.innerText = 'No has seleccionado ninguna entrada aún.';
    }

    document.getElementById('subtotal').innerText = subtotal;
    
    let descuento = 0;
    if (descuentoAplicado) {
        descuento = subtotal * 0.15;
        document.getElementById('texto-descuento').style.display = 'block';
        document.getElementById('valor-descuento').innerText = descuento.toFixed(2);
    } else {
        document.getElementById('texto-descuento').style.display = 'none';
    }

    const total = subtotal - descuento;
    document.getElementById('total').innerText = total.toFixed(2);
}

function aplicarDescuento() {
    const input = document.getElementById('input-descuento').value.toUpperCase();
    if (input === CODIGO_VALIDO) {
        descuentoAplicado = true;
        lanzarAlertaPersonalizada("CÓDIGO PROMO:<br>Cupón verificado con éxito. Se descontó el 15% del subtotal.", true);
    } else {
        descuentoAplicado = false;
        lanzarAlertaPersonalizada("CÓDIGO PROMO:<br>El código introducido no es válido o ha expirado.");
    }
    actualizarResumen();
}

// === SIMULADOR DE COMPRA CON GENERADOR DE CLAVE DE ACCESO ALEATORIA ===
function simularCompra() {
    const total = parseFloat(document.getElementById('total').innerText);
    const ciInput = document.getElementById('ci-cliente').value.trim();
    const tarjetaInput = document.getElementById('tarjeta-cliente').value.trim();
    const estadoVacio = document.getElementById('estado-vacio');
    
    const esNumerico = /^\d+$/;

    if (total === 0 || ciInput === "" || tarjetaInput === "" || !esNumerico.test(ciInput) || ciInput.length < 8 || !esNumerico.test(tarjetaInput) || tarjetaInput.length < 8) {
        estadoVacio.style.display = 'block';
        estadoVacio.style.color = 'var(--accent-pink)'; 
        estadoVacio.style.fontWeight = 'bold';
        estadoVacio.innerText = 'Debe rellenar todos los campos';
        return;
    }

    let totalEntradasSeleccionadas = Object.values(carrito.entradas).reduce((a, b) => a + b, 0);
    if (carrito.asientos.length > totalEntradasSeleccionadas) {
        lanzarAlertaPersonalizada("ERROR DE CONSISTENCIA:<br>Tienes más asientos VIP marcados que entradas compradas.");
        return;
    }

    // NUEVO: Generar un número de acceso al azar de 6 dígitos (Entre 100000 y 999999)
    const claveTaquilla = Math.floor(100000 + Math.random() * 900000);

    // Desplegar la ventana modal adaptando el mensaje final con el token generado
    lanzarAlertaPersonalizada(`
        ¡ADQUISICIÓN COMPLETADA CON ÉXITO!<br><br>
        <b>Monto liquidado:</b> $${total.toFixed(2)} USD<br>
        <b>Titular C.I:</b> ${ciInput}<br><br>
        <div style="background: #111; padding: 15px; border: 2px dashed var(--accent-neon); margin-top: 10px;">
            <span style="font-size: 0.85rem; color: #aaa; display: block; margin-bottom: 5px;">CLAVE DE ACCESO EN TAQUILLA</span>
            <span style="font-size: 1.8rem; font-weight: bold; color: var(--accent-neon); letter-spacing: 3px;">${claveTaquilla}</span>
        </div>
        <p style="font-size: 0.9rem; color: #888; margin-top: 15px; line-height: 1.4;">
            Presente este código digital en los puntos de validación del estadio para retirar sus pases físicos o validar sus accesos VIP preferenciales.
        </p>
    `, true);
}

// === CRONÓMETRO REGRESIVO ===
function iniciarContador() {
    let tiempo = 15 * 60; 
    const display = document.getElementById('contador');
    if(!display) return;
    
    setInterval(() => {
        const minutos = Math.floor(tiempo / 60);
        let segundos = tiempo % 60;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        
        display.innerText = `La preventa termina en: ${minutos}:${segundos}`;
        if (tiempo > 0) tiempo--;
    }, 1000);
}
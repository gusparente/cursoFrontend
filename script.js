let carrito = [];

// ========== BASE DE DATOS DE PRODUCTOS ==========
const productosData = {
    guitarra: {
        id: 'guitarra',
        nombre: 'Guitarra Eléctrica',
        precio: 4300000,
        imagen: 'imagenes/fender-1965-stratocaster.webp',
        descripcion: 'La Stratocaster clásica con el sonido que marcó una época. Ideal para rock, blues y jazz. Su diseño icónico y su versatilidad la convierten en la elección de músicos de todo el mundo.',
        specs: [
            ['Marca', 'Fender'],
            ['Modelo', 'Stratocaster 1965'],
            ['Pastillas', '3 single-coil de alta ganancia'],
            ['Mástil', 'Arce con diapasón de palisandro'],
            ['Incluye', 'Funda rígida y correa']
        ],
        stock: 12
    },
    bateria: {
        id: 'bateria',
        nombre: 'Batería Acústica',
        precio: 1335000,
        imagen: 'imagenes/bata.jpg',
        descripcion: 'Batería profesional con sonido potente y definido. Perfecta para estudio y escenario. Su construcción en madera de arce ofrece una resonancia excepcional y durabilidad.',
        specs: [
            ['Marca', 'Pearl'],
            ['Piezas', '5 (bombo, caja, 2 toms, hi-hat)'],
            ['Material', 'Madera de arce con acabado brillante'],
            ['Platillos', '2 crash + 1 ride'],
            ['Incluye', 'Baquetas y funda']
        ],
        stock: 8
    },
    teclado: {
        id: 'teclado',
        nombre: 'Teclado Digital',
        precio: 840000,
        imagen: 'imagenes/tecladoDigital.jpg',
        descripcion: 'Teclado versátil ideal para músicos de todos los niveles. Con conectividad USB y MIDI, te permite grabar y conectar a tu DAW favorito. Perfecto para estudio y presentaciones.',
        specs: [
            ['Marca', 'Yamaha'],
            ['Teclas', '88 con respuesta dinámica'],
            ['Sonidos', '500+ presets'],
            ['Efectos', 'Reverb, chorus, delay'],
            ['Incluye', 'Soporte y pedal de sustain']
        ],
        stock: 15
    },
    trompeta: {
        id: 'trompeta',
        nombre: 'Trompeta Dorada',
        precio: 290000,
        imagen: 'imagenes/TrompetaScoiposDorada.webp',
        descripcion: 'Trompeta de excelente calidad con sonido brillante y proyección. Ideal para orquestas y bandas. Su construcción en latón lacado garantiza durabilidad y un sonido profesional.',
        specs: [
            ['Marca', 'Stomvi'],
            ['Material', 'Latón lacado dorado'],
            ['Bomba', 'Afinación en Si♭'],
            ['Embocadura', 'Incluida'],
            ['Incluye', 'Estuche rígido y bozal']
        ],
        stock: 20
    },
    violin: {
        id: 'violin',
        nombre: 'Violín Eléctrico',
        precio: 248000,
        imagen: 'imagenes/electric-violins.webp',
        descripcion: 'Violín eléctrico con sonido limpio y moderna estética. Ideal para música experimental y eléctrica. Su diseño ergonómico permite tocar con comodidad durante horas.',
        specs: [
            ['Marca', 'Yamaha'],
            ['Tipo', 'Eléctrico de 4 cuerdas'],
            ['Material', 'Ébano y abeto'],
            ['Amplificador', '10W incluido'],
            ['Incluye', 'Cable y estuche']
        ],
        stock: 10
    },
    monitores: {
        id: 'monitores',
        nombre: 'Monitores Studio',
        precio: 376000,
        imagen: 'imagenes/01-Mackie-CR-Series-CR3.jpg',
        descripcion: 'Monitores de estudio con respuesta plana para mezcla y producción profesional. Su diseño optimizado ofrece una reproducción de audio precisa y detallada.',
        specs: [
            ['Marca', 'Mackie'],
            ['Modelo', 'CR Series CR3'],
            ['Potencia', '50W RMS'],
            ['Respuesta', '80Hz - 20kHz'],
            ['Incluye', 'Cables RCA y adaptador']
        ],
        stock: 25
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    configurarFormularioContacto();
    configurarBotonesCompra();
    actualizarContadorCarrito();
});

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.quantity += 1;
    } else {
        carrito.push({ ...producto, quantity: 1 });
    }
    
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    mostrarMensajeConfirmacion(`✅ ${producto.title} agregado al carrito`);
    
    if (document.getElementById('cart-modal')?.style.display === 'block') {
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    mostrarCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }
    
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.quantity = nuevaCantidad;
        guardarCarritoEnStorage();
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
        carrito = [];
        guardarCarritoEnStorage();
        actualizarContadorCarrito();
        mostrarCarrito();
        mostrarMensajeConfirmacion('🛒 Carrito vaciado');
    }
}

function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function guardarCarritoEnStorage() {
    try {
        localStorage.setItem('carritoRuidoMaker', JSON.stringify(carrito));
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

function cargarCarritoDesdeStorage() {
    try {
        const carritoGuardado = localStorage.getItem('carritoRuidoMaker');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
    } catch (error) {
        console.error('Error al cargar:', error);
        carrito = [];
    }
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

function mostrarCarrito() {
    let modal = document.getElementById('cart-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cart-modal';
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarCarrito();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cerrarCarrito();
            }
        });
    }
    
    let contenido = '';
    
    if (carrito.length === 0) {
        contenido = `
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e63946; padding-bottom: 15px;">
                    <h2 style="color: #e63946; font-family: 'Montserrat', sans-serif;">🛒 Carrito de Compras</h2>
                </div>
                <p style="color: #f1faee; font-size: 1.2rem; text-align: center; margin: 30px 0;">Tu carrito está vacío</p>
                <p style="color: #aaaaaa; text-align: center; margin-bottom: 30px;">¡Explorá nuestros productos y agregá lo que te guste!</p>
                <button onclick="cerrarCarrito()" style="display: block; margin: 0 auto; background: linear-gradient(135deg, #e63946, #f4a261); color: #1a1a1a; padding: 12px 30px; border: none; border-radius: 30px; cursor: pointer; font-weight: 700; font-size: 1rem;">Seguir comprando</button>
            </div>
        `;
    } else {
        let itemsHTML = '';
        carrito.forEach((item) => {
            const titulo = item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title;
            itemsHTML += `
                <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #252525; border-radius: 10px; margin-bottom: 10px; border: 1px solid rgba(230,57,70,0.2);">
                    <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: contain; background: white; border-radius: 8px; padding: 5px;">
                    <div style="flex: 1;">
                        <p style="color: #f1faee; font-weight: 600; margin-bottom: 5px;">${titulo}</p>
                        <p style="color: #f4a261; font-weight: 700;">$${item.price.toFixed(2)}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="actualizarCantidad('${item.id}', ${item.quantity - 1})" style="background: #333; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; font-weight: 700;">-</button>
                        <span style="color: #f1faee; font-weight: 700; min-width: 30px; text-align: center;">${item.quantity}</span>
                        <button onclick="actualizarCantidad('${item.id}', ${item.quantity + 1})" style="background: #333; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; font-weight: 700;">+</button>
                    </div>
                    <button onclick="eliminarDelCarrito('${item.id}')" style="background: transparent; border: none; color: #e63946; cursor: pointer; font-size: 1.2rem;">✕</button>
                </div>
            `;
        });
        
        const total = calcularTotalCarrito();
        
        contenido = `
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e63946; padding-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h2 style="color: #e63946; font-family: 'Montserrat', sans-serif;">🛒 Carrito de Compras</h2>
                    <span style="color: #f1faee;">${carrito.reduce((sum, item) => sum + item.quantity, 0)} productos</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${itemsHTML}
                </div>
                
                <div style="border-top: 2px solid #333; padding-top: 20px; margin-top: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <span style="color: #f1faee; font-size: 1.2rem; font-weight: 600;">Total:</span>
                        <span style="color: #f4a261; font-size: 1.8rem; font-weight: 900;">$${total.toFixed(2)}</span>
                    </div>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="vaciarCarrito()" style="flex: 1; background: #333; color: #e63946; padding: 12px 20px; border: 1px solid #e63946; border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 0.9rem; min-width: 120px;">Vaciar carrito</button>
                        <button onclick="finalizarCompra()" style="flex: 2; background: linear-gradient(135deg, #e63946, #f4a261); color: #1a1a1a; padding: 12px 25px; border: none; border-radius: 30px; cursor: pointer; font-weight: 700; font-size: 1rem; min-width: 150px;">Finalizar compra</button>
                        <button onclick="cerrarCarrito()" style="flex: 1; background: #333; color: #f1faee; padding: 12px 20px; border: none; border-radius: 30px; cursor: pointer; font-weight: 600; font-size: 0.9rem; min-width: 120px;">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = contenido;
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensajeConfirmacion('El carrito está vacío');
        return;
    }
    
    const total = calcularTotalCarrito();
    const mensaje = `🎉 ¡Compra realizada con éxito!\n\nTotal: $${total.toFixed(2)}\nProductos: ${carrito.reduce((sum, item) => sum + item.quantity, 0)}\n\n¡Gracias por comprar en Ruido Maker!`;
    
    mostrarMensajeConfirmacion(mensaje);
    
    carrito = [];
    guardarCarritoEnStorage();
    actualizarContadorCarrito();
    cerrarCarrito();
}

function mostrarMensajeConfirmacion(mensaje) {
    const mensajeExistente = document.getElementById('mensaje-flotante');
    if (mensajeExistente) {
        mensajeExistente.remove();
    }
    
    const mensajeDiv = document.createElement('div');
    mensajeDiv.id = 'mensaje-flotante';
    mensajeDiv.textContent = mensaje;
    
    document.body.appendChild(mensajeDiv);
    
    setTimeout(() => {
        if (mensajeDiv) {
            mensajeDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                mensajeDiv.remove();
            }, 300);
        }
    }, 4000);
}

function configurarCarritoNav() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        const liCarrito = document.createElement('li');
        liCarrito.style.position = 'relative';
        liCarrito.innerHTML = `
            <a href="#" id="cart-toggle" style="display: flex; align-items: center; gap: 8px;">
                🛒 Carrito
                <span id="cart-count" style="background: #e63946; color: white; border-radius: 50%; padding: 2px 8px; font-size: 0.75rem; font-weight: 700; min-width: 20px; text-align: center; display: none;">0</span>
            </a>
        `;
        nav.appendChild(liCarrito);
        
        document.getElementById('cart-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            mostrarCarrito();
        });
    }
}

function configurarBotonesCompra() {
    const botones = document.querySelectorAll('.product-card .buy-btn');
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = boton.getAttribute('data-product');
            if (productId && productosData[productId]) {
                const producto = productosData[productId];
                const itemCarrito = {
                    id: productId,
                    title: producto.nombre,
                    price: producto.precio,
                    image: producto.imagen,
                    quantity: 1
                };
                agregarAlCarrito(itemCarrito);
            }
        });
    });
}

function configurarFormularioContacto() {
    const form = document.querySelector('.contact-form-wrapper form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const mensaje = form.querySelector('textarea[name="message"]');
        
        if (!nombre.value.trim()) {
            mostrarErrorValidacion(nombre, 'Por favor, ingresá tu nombre');
            return;
        }
        
        if (!validarEmail(email.value)) {
            mostrarErrorValidacion(email, 'Por favor, ingresá un email válido');
            return;
        }
        
        if (!mensaje.value.trim()) {
            mostrarErrorValidacion(mensaje, 'Por favor, escribí un mensaje');
            return;
        }
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                mostrarMensajeConfirmacion('✅ ¡Mensaje enviado con éxito! Te responderemos a la brevedad.');
                form.reset();
            } else {
                mostrarMensajeConfirmacion('❌ Hubo un error al enviar el mensaje. Intentá nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensajeConfirmacion('❌ Error de conexión. Intentá nuevamente.');
        }
    });
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            limpiarErrorValidacion(input);
        });
    });
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErrorValidacion(input, mensaje) {
    limpiarErrorValidacion(input);
    
    input.style.borderColor = '#e63946';
    input.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.3)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    
    input.parentNode.appendChild(errorDiv);
    input.focus();
}

function limpiarErrorValidacion(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ===== FUNCIÓN PARA CARGAR DETALLE DEL PRODUCTO =====
function cargarDetalleProducto() {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId || !productosData[productId]) {
        document.getElementById('product-detail').innerHTML = `
            <div style="width:100%; text-align:center; padding:60px 0; color:#e63946;">
                <h2>⚠️ Producto no encontrado</h2>
                <p style="color:#aaaaaa; margin-top:15px;">El producto que buscás no existe o fue eliminado.</p>
                <a href="index.html#productos" style="display:inline-block; margin-top:20px; background: linear-gradient(135deg, #e63946, #f4a261); color: #1a1a1a; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 700;">Volver a productos</a>
            </div>
        `;
        return;
    }
    
    const producto = productosData[productId];
    
    // Actualizar título de la página
    document.title = `Ruido Maker - ${producto.nombre}`;
    
    // Generar HTML de especificaciones
    let specsHTML = '';
    producto.specs.forEach(spec => {
        specsHTML += `<li><strong>${spec[0]}:</strong> ${spec[1]}</li>`;
    });
    
    // Generar HTML del detalle
    const detailHTML = `
        <div class="product-detail-image">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="product-detail-info">
            <h1>${producto.nombre}</h1>
            <span class="price-detail">$${producto.precio.toLocaleString()}</span>
            <p class="description">${producto.descripcion}</p>
            <div class="specs">
                <h3>📋 Especificaciones técnicas</h3>
                <ul>
                    ${specsHTML}
                </ul>
            </div>
            <p class="stock">✅ Disponible: ${producto.stock} unidades</p>
            <div class="btn-group">
                <button class="buy-btn-detail" onclick="agregarProductoCarrito('${productId}')">🛒 Agregar al carrito</button>
                <a href="index.html#productos" class="back-btn">Volver</a>
            </div>
        </div>
    `;
    
    document.getElementById('product-detail').innerHTML = detailHTML;
    
    // Cargar productos relacionados
    cargarProductosRelacionados(productId);
}

function agregarProductoCarrito(productId) {
    if (productosData[productId]) {
        const producto = productosData[productId];
        const itemCarrito = {
            id: productId,
            title: producto.nombre,
            price: producto.precio,
            image: producto.imagen,
            quantity: 1
        };
        agregarAlCarrito(itemCarrito);
    }
}

function cargarProductosRelacionados(productId) {
    const container = document.getElementById('related-products');
    const otrosProductos = Object.keys(productosData).filter(id => id !== productId);
    
    // Tomar hasta 4 productos relacionados
    const relacionados = otrosProductos.slice(0, 4);
    
    let html = '';
    relacionados.forEach(id => {
        const prod = productosData[id];
        html += `
            <a href="producto.html?id=${id}" class="related-item">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <span class="price-related">$${prod.precio.toLocaleString()}</span>
            </a>
        `;
    });
    
    container.innerHTML = html;
}

function init() {
    configurarCarritoNav();
    actualizarContadorCarrito();
}

document.addEventListener('DOMContentLoaded', init);

// Exponer funciones globales
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;
window.vaciarCarrito = vaciarCarrito;
window.mostrarCarrito = mostrarCarrito;
window.cerrarCarrito = cerrarCarrito;
window.finalizarCompra = finalizarCompra;
window.mostrarMensajeConfirmacion = mostrarMensajeConfirmacion;
window.agregarProductoCarrito = agregarProductoCarrito;

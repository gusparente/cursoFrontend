# Ruido Maker - Tienda de Instrumentos Musicales

## Propósito

**Ruido Maker** es un sitio web temático para la venta de instrumentos musicales. El proyecto demuestra:

- Estructura semántica HTML5
- Estilos CSS con Flexbox, Grid y Media Queries
- Interactividad con JavaScript
- Navegación entre páginas (index + detalle de producto)

## Estructura del sitio

### Páginas
- **index.html**: Página principal con todos los productos
- **producto.html**: Página de detalle de cada producto (se carga dinámicamente según el ID en la URL)

### Etiquetas semánticas utilizadas
- `<header>`: Encabezado con nombre y eslogan
- `<nav>`: Barra de navegación con lista desordenada
- `<main>`: Contenido principal
- `<section>`: Inicio, Productos, Reseñas, Multimedia, Contacto
- `<footer>`: Pie de página

## Funcionalidades

### Página de Productos
- Tarjetas con imagen, nombre, descripción corta y precio
- Click en la tarjeta → redirige a página de detalle
- Botón "Comprar" → agrega al carrito sin salir de la página

### Página de Detalle
- Muestra información completa del producto
- Especificaciones técnicas
- Disponibilidad (stock)
- Botón para agregar al carrito
- Productos relacionados
- Botón para volver al listado

### Carrito de Compras
- Agregar productos desde las tarjetas o desde el detalle
- Persistencia con localStorage
- Contador en tiempo real
- Modal con edición de cantidades
- Total dinámico
- Simulación de compra

### Formulario de Contacto
- Validación de campos
- Formato de email
- Envío a Formspree
- Mensajes de confirmación

### Accesibilidad
- Alt en imágenes
- Skip link
- Navegación por teclado

### Responsive
- Adaptable a todos los tamaños de pantalla
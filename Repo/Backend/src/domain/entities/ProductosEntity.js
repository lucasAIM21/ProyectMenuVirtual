// src/domain/entities/producto.entity.js
const crearProducto = (datos) => {
    // Validaciones de dominio
    if (!datos.nombre || datos.nombre.trim().length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres");
    }
    
    return Object.freeze({
        id: datos.id,
        nombre: datos.nombre.trim(),
        precio: parseFloat(datos.precio),
        descripcion: datos.descripcion || "",
        cantidad: parseInt(datos.cantidad) || 0,
        categoriaId: datos.categoriaId || null,
        
        // Métodos de dominio
        actualizarPrecio: (nuevoPrecio) => {
            if (nuevoPrecio <= 0) throw new Error("Precio inválido");
            return crearProducto({ ...datos, precio: nuevoPrecio });
        }
    });
};
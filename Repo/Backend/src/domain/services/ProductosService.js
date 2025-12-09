const productoService = (productoRepository) => ({
    // 📋 Obtener todos los productos (con transformación)
    obtenerProductos: async () => {
        const resultados = await productoRepository.findAll();
        
        // Transformar datos para la respuesta
        return resultados.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            descripcion: p.descripcion,
            cantidad: p.cantidad,
            imagen: p.imagen,
            categoria: p.categoriaId ? {
                id: p.categoriaId,
                nombre: p.categoriaNombre,
                icono: p.categoriaImagen
            } : null
        }));
    },

    // ➕ Crear producto (con validaciones)
    crearProducto: async (productoData, imagenFile) => {
        // Validaciones de negocio
        if (!productoData.nombre || !productoData.precio) {
            throw new Error("Nombre y precio son obligatorios");
        }

        if (productoData.precio <= 0) {
            throw new Error("El precio debe ser mayor a 0");
        }

        // Crear producto en BD
        const producto = await productoRepository.create(productoData);

        // Si hay imagen, guardarla
        if (imagenFile) {
            const rutaImagen = "/imgs/imgP/" + imagenFile.filename;
            await productoRepository.saveImage(producto.id, rutaImagen);
        }

        return { ...producto, message: "Producto creado exitosamente" };
    },

    // ✏️ Actualizar producto
    actualizarProducto: async (id, productoData, imagenFile) => {
        // Verificar que el producto existe
        const productoExistente = await productoRepository.findById(id);
        if (!productoExistente) {
            throw new Error("Producto no encontrado");
        }

        // Validaciones
        if (productoData.precio && productoData.precio <= 0) {
            throw new Error("El precio debe ser mayor a 0");
        }

        // Actualizar producto
        const actualizado = await productoRepository.update(id, productoData);

        // Actualizar imagen si se proporciona
        if (imagenFile) {
            const rutaImagen = "/imgs/imgP/" + imagenFile.filename;
            await productoRepository.saveImage(id, rutaImagen);
        }

        return { 
            success: actualizado, 
            message: actualizado ? "Producto actualizado" : "No se pudo actualizar" 
        };
    },

    // 🗑️ Eliminar producto
    eliminarProducto: async (id) => {
        // Verificar que el producto existe
        const productoExistente = await productoRepository.findById(id);
        if (!productoExistente) {
            throw new Error("Producto no encontrado");
        }

        // Eliminar producto (el repository ya maneja la imagen)
        const eliminado = await productoRepository.delete(id);

        return {
            success: eliminado,
            message: eliminado ? "Producto eliminado" : "No se pudo eliminar"
        };
    }
});

module.exports = productoService;
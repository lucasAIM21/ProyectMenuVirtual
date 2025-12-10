const productoController = (productoService, logger) => ({
    // 📋 Obtener todos los productos
    obtenerProductos: async (req, res) => {
        try {
            logger.info("📍 Petición GET /api/productos recibida");
            
            const productos = await productoService.obtenerProductos();
            
            logger.info(`✅ Consulta exitosa. Enviando ${productos.length} productos`);
            res.json(productos);
        } catch (error) {
            logger.error("❌ Error en la consulta:", error);
            res.status(500).json({ error: "Error en la consulta", details: error.message });
        }
    },

    // ➕ Crear nuevo producto
    crearProducto: async (req, res) => {
        try {
            logger.info("📍 Petición POST /api/productos recibida", req.body);
            
            const productoData = {
                nombre: req.body.nombre,
                precio: parseFloat(req.body.precio),
                descripcion: req.body.descripcion,
                cantidad: parseInt(req.body.cantidad) || 0,
                CategoriaId: req.body.CategoriaId || null
            };

            const resultado = await productoService.crearProducto(
                productoData, 
                req.file
            );

            res.status(201).json(resultado);
        } catch (error) {
            logger.error("❌ Error al crear producto:", error);
            
            if (error.message.includes("obligatorios") || error.message.includes("mayor a 0")) {
                return res.status(400).json({ error: error.message });
            }
            
            res.status(500).json({ 
                error: "Error al crear producto", 
                details: error.message 
            });
        }
    },

    // ✏️ Actualizar producto
    actualizarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            logger.info(`📍 Petición PUT /api/productos/${id} recibida`);

            const productoData = {
                nombre: req.body.nombre,
                precio: req.body.precio ? parseFloat(req.body.precio) : undefined,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad ? parseInt(req.body.cantidad) : undefined
            };

            const resultado = await productoService.actualizarProducto(
                id, 
                productoData, 
                req.file
            );

            if (resultado.success) {
                res.json(resultado);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            logger.error("❌ Error al modificar producto:", error);
            
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            
            if (error.message.includes("mayor a 0")) {
                return res.status(400).json({ error: error.message });
            }
            
            res.status(500).json({ 
                error: "Error al modificar producto", 
                details: error.message 
            });
        }
    },

    // 🗑️ Eliminar producto
    eliminarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            logger.info(`📍 Petición DELETE /api/productos/${id} recibida`);

            const resultado = await productoService.eliminarProducto(id);

            if (resultado.success) {
                res.json(resultado);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            logger.error("❌ Error al eliminar producto:", error);
            
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            
            res.status(500).json({ 
                error: "Error al eliminar producto", 
                details: error.message 
            });
        }
    }
});

module.exports = productoController;
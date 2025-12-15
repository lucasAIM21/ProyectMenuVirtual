const categoriaController= (productoService, logger) =>({
    obtenerCategorias: async (req, res) =>{
        try {
            logger.info("📍 Petición GET /api/Categorias recibida");

            const categorias = await productoService.obtenerCategorias();
            logger.info(`✅ Consulta exitosa. Enviando ${categorias.length} categorias`);
            res.json(categorias);
        } catch (error) {
            logger.error("❌ Error en la consulta:", error);
            res.status(500).json({ error: "Error en la consulta", details: error.message });
        }
    }
});

module.exports = categoriaController;
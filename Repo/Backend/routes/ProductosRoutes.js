    const express = require("express");
    const router = express.Router();

    // Configuraciones
    const upload = require("../config/multer");
    const authMiddleware = require("../src/api/MiddleWares/AuthMW"); // Cambiado

    // Repositorios y servicios
    const productoRepository = require("../src/infrastructure/repositories/ProductosRepository");
    const productoService = require("../src/domain/services/ProductosService");
    const productoControllerFactory = require("../src/aplication/controllers/ProductosController");

    // Logger simple
    const logger = {
        info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
        error: (message, error) => console.error(`[ERROR] ${message}`, error || ''),
        warn: (message, data) => console.warn(`[WARN] ${message}`, data || '')
    };

    // Inicializar dependencias
    const servicio = productoService(productoRepository);
    const controlador = productoControllerFactory(servicio, logger);

    // ==================== RUTAS ====================

    // 📋 Obtener todos los productos (público)
    router.get("/", controlador.obtenerProductos);

    // ➕ Crear nuevo producto (protegido)
    router.post("/", authMiddleware, upload.single("imagen"), controlador.crearProducto);

    // ✏️ Actualizar producto (protegido)
    router.put("/:id", authMiddleware, upload.single("imagen"), controlador.actualizarProducto);

    // 🗑️ Eliminar producto (protegido)
    router.delete("/:id", authMiddleware, controlador.eliminarProducto);

    module.exports = router;
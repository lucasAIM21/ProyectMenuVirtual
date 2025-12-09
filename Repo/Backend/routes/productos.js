const express = require("express");
const router = express.Router();

// Configuraciones
const upload = require("../config/multer.config"); 
 
  

const ValidarPIN = require("./MWSesion");

// Repositorios y servicios
const productoRepository = require("../src/infrastructure/repositories/producto.repository");
const productoService = require("../src/domain/services/producto.service");
const productoControllerFactory = require("../src/application/controllers/producto.controller");

// Logger simple
const logger = {
    info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
    error: (message, error) => console.error(`[ERROR] ${message}`, error || '')
};

// Inicializar dependencias
const servicio = productoService(productoRepository);
const controlador = productoControllerFactory(servicio, logger);

// ==================== RUTAS ====================

// 📋 Obtener todos los productos
router.get("/", controlador.obtenerProductos);

// ➕ Crear nuevo producto (con autenticación y subida de imagen)
router.post("/", ValidarPIN, upload.single("imagen"), controlador.crearProducto);

// ✏️ Actualizar producto (con autenticación y posible nueva imagen)
router.put("/:id", ValidarPIN, upload.single("imagen"), controlador.actualizarProducto);

// 🗑️ Eliminar producto (con autenticación)
router.delete("/:id", ValidarPIN, controlador.eliminarProducto);

module.exports = router;
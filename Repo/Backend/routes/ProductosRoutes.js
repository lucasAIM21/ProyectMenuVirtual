const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const authMiddleware = require("../src/api/MiddleWares/AuthMW");

// 📋 Público
router.get("/", (req, res) =>
    req.productoController.obtenerProductos(req, res)
);

// ➕ Protegido
router.post("/", authMiddleware, upload.single("imagen"), (req, res) =>
    req.productoController.crearProducto(req, res)
);

// ✏️ Protegido
router.put("/:id", authMiddleware, upload.single("imagen"), (req, res) =>
    req.productoController.actualizarProducto(req, res)
);

// 🗑️ Protegido
router.delete("/:id", authMiddleware, (req, res) =>
    req.productoController.eliminarProducto(req, res)
);

module.exports = router;

const express = require("express");
const router = express.Router();

// ==================== RUTAS DE SESIÓN ====================

// POST /api/sesion (Validar PIN)
router.post("/", async (req, res) => {
    try {
        await req.sessionController.validarPIN(req, res);
    } catch (error) {
        console.error("❌ Error en ruta de sesión:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});

// GET /api/sesion (Verificar sesión)
router.get("/", (req, res) => {
    try {
        req.sessionController.verificarSesion(req, res);
    } catch (error) {
        console.error("❌ Error verificando sesión:", error);
        res.status(500).json({
            autenticado: false,
            error: "Error interno del servidor"
        });
    }
});

// DELETE /api/sesion (Cerrar sesión)
router.delete("/", (req, res) => {
    try {
        req.sessionController.cerrarSesion(req, res);
    } catch (error) {
        console.error("❌ Error cerrando sesión:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});

module.exports = router;
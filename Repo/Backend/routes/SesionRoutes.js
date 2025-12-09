const express = require("express");
const router = express.Router();

// Importar controlador (inyectado desde server.js)
// En server.js inyectaremos el controlador en req.sessionController

// ==================== POST /api/sesion (Validar PIN) ====================
router.post("/", async (req, res) => {
    try {
        // Delegar al controlador inyectado
        await req.sessionController.validarPIN(req, res);
    } catch (error) {
        console.error("❌ Error en ruta de sesión:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});

// ==================== GET /api/sesion (Verificar sesión) ====================
router.get("/", (req, res) => {
    try {
        // Delegar al controlador inyectado
        req.sessionController.verificarSesion(req, res);
    } catch (error) {
        console.error("❌ Error verificando sesión:", error);
        res.status(500).json({
            autenticado: false,
            error: "Error interno del servidor"
        });
    }
});

// ==================== DELETE /api/sesion (Cerrar sesión) ====================
router.delete("/", (req, res) => {
    try {
        // Nuevo endpoint para cerrar sesión
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error("❌ Error cerrando sesión:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Error al cerrar sesión"
                    });
                }
                
                // Limpiar cookie
                res.clearCookie('connect.sid');
                res.json({
                    success: true,
                    message: "Sesión cerrada exitosamente"
                });
            });
        } else {
            res.json({
                success: true,
                message: "No hay sesión activa"
            });
        }
    } catch (error) {
        console.error("❌ Error en logout:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});

module.exports = router;
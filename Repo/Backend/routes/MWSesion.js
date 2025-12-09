/**
 * Middleware de autenticación HTTP
 * Verifica si hay una sesión válida antes de permitir acceso a rutas protegidas
 */

const validarSesion = (req, res, next) => {
    // Verificar si existe sesión y está autenticada
    if(req.session && req.session.autenticado){
        console.log(`✅ Sesión válida para usuario: ${req.session.userId || 'admin'}`);
        next(); // Pasar al siguiente middleware/controlador
    } else {
        console.log('❌ Intento de acceso sin sesión válida');
        res.status(401).json({
            error: "No autorizado",
            message: "Sesión no válida o expirada. Por favor, inicie sesión nuevamente."
        });
    }
};

module.exports = validarSesion;
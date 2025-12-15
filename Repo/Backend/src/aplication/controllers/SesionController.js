const createSesionController = (sesionService, logger) => ({
    /**
     * Validar PIN de administración
     */
    validarPIN: async (req, res) => {
        try {
            const { pin } = req.body;
            
            if (!pin) {
                logger.warn("Intento de validación sin PIN");
                return res.status(400).json({
                    success: false,
                    message: "Falta el PIN"
                });
            }
            
            logger.info(`Validando PIN: ${pin.substring(0, 2)}...`);
            const resultado = await sesionService.validarPIN(pin);
            
            if (resultado.success) {
                // Establecer sesión
                req.session.autenticado = true;
                req.session.userId = 'admin';
                req.session.timestamp = new Date();
                
                return req.session.save(err => {
                    if (err) {
                        logger.error("Error guardando sesión:", err);
                            return res.status(500).json({
                            success: false,
                            message: "Error guardando sesión"
                        });
                    }

                    logger.info("PIN válido, sesión creada y guardada");

                    // 3️⃣ Recién ahora respondes
                    return res.json({
                        success: true,
                        message: "PIN Correcto",
                        sessionId: req.sessionID
                    });
                });
            } else {
                logger.warn("PIN incorrecto rechazado");
                return res.status(401).json({
                    success: false,
                    message: "PIN incorrecto"
                });
            }
        } catch (error) {
            logger.error("Error en validarPIN:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    /**
     * Verificar estado de sesión
     */
    verificarSesion: (req, res) => {
        try {
            const autenticado = !!(req.session && req.session.autenticado);
            
            if (autenticado) {
                logger.debug(`Sesión activa para: ${req.session.userId || 'admin'}`);
                res.json({
                    autenticado: true,
                    userId: req.session.userId,
                    timestamp: req.session.timestamp
                });
            } else {
                logger.debug("Sesión no autenticada");
                res.json({
                    autenticado: false
                });
            }
        } catch (error) {
            logger.error("Error en verificarSesion:", error);
            res.status(500).json({
                autenticado: false,
                error: "Error verificando sesión"
            });
        }
    },

    /**
     * Cerrar sesión
     */
    cerrarSesion: (req, res) => {
        try {
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) {
                        logger.error("Error cerrando sesión:", err);
                        return res.status(500).json({
                            success: false,
                            message: "Error al cerrar sesión"
                        });
                    }
                    
                    // Limpiar cookie
                    res.clearCookie('session_cookie'); // Usar el mismo nombre que en server.js
                    logger.info("Sesión cerrada exitosamente");
                    res.json({
                        success: true,
                        message: "Sesión cerrada exitosamente"
                    });
                });
            } else {
                logger.debug("No hay sesión activa para cerrar");
                res.json({
                    success: true,
                    message: "No hay sesión activa"
                });
            }
        } catch (error) {
            logger.error("Error en cerrarSesion:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    }
});

module.exports = createSesionController;
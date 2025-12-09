const createSesionController = (sesionService, logger) => ({
    validarPIN: (req, res) => {
        const { pin } = req.body;
        const pinCorrecto = process.env.APP_PIN;

        if (!pin) {
            logger.warn('Intento de validación sin PIN');
            return res.status(400).json({ success: false, message: "Falta el PIN" });
        }

        const esValido = sesionService.validarPIN(pin, pinCorrecto);

        if (esValido) {
            req.session.autenticado = true;
            logger.info('PIN validado correctamente');
            return res.json({ success: true, message: "PIN Correcto" });
        } else {
            logger.warn('Intento de validación con PIN incorrecto');
            return res.status(401).json({ success: false, message: "PIN incorrecto" });
        }
    },

    estadoSesion: (req, res) => {
        const autenticado = sesionService.verificarAutenticacion(req.session);
        res.json({ autenticado });
    }
});

module.exports = createSesionController;
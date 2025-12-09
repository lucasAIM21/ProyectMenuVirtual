/**
 * Servicio de sesión
 * Contiene la lógica de negocio para autenticación
 */

const createSesionService = (logger) => {
    // Obtener PIN desde variables de entorno
    const PINC = process.env.APP_PIN || "1234";
    
    return {
        /**
         * Validar PIN con reglas de negocio
         */
        validarPIN: async (pinIngresado) => {
            // Validación 1: PIN no vacío
            if (!pinIngresado || pinIngresado.trim() === "") {
                logger.warn("PIN vacío recibido");
                return {
                    success: false,
                    message: "El PIN no puede estar vacío"
                };
            }
            
            // Validación 2: Solo números (opcional)
            if (!/^\d+$/.test(pinIngresado)) {
                logger.warn(`PIN con formato inválido: ${pinIngresado}`);
                return {
                    success: false,
                    message: "El PIN debe contener solo números"
                };
            }
            
            // Validación 3: Longitud mínima (opcional)
            if (pinIngresado.length < 4) {
                logger.warn(`PIN demasiado corto: ${pinIngresado}`);
                return {
                    success: false,
                    message: "El PIN debe tener al menos 4 dígitos"
                };
            }
            
            // Validación 4: Coincidencia con PIN almacenado
            if (pinIngresado === PINC) {
                logger.info("PIN válido aceptado");
                return {
                    success: true,
                    message: "PIN Correcto"
                };
            } else {
                logger.warn(`PIN incorrecto: ${pinIngresado} (esperado: ${PINC.substring(0, 2)}...)`);
                return {
                    success: false,
                    message: "PIN incorrecto"
                };
            }
        },
        
        /**
         * Obtener tiempo restante de sesión
         */
        obtenerTiempoRestante: (session) => {
            if (!session || !session.timestamp) {
                return 0;
            }
            
            const ahora = new Date();
            const inicioSesion = new Date(session.timestamp);
            const diferenciaMs = ahora - inicioSesion;
            const tiempoMaximo = 60 * 60 * 1000; // 1 hora en milisegundos
            
            return Math.max(0, tiempoMaximo - diferenciaMs);
        }
    };
};

module.exports = createSesionService;
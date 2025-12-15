const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

// Configuración
require("dotenv").config();

// Rutas
const productosRoutes = require("./routes/ProductosRoutes");
const sesionRoutes = require("./routes/SesionRoutes");

// Dependencias
const db = require("./config/db");
const productoRepository = require("./src/infrastructure/repositories/ProductosRepository");
const productoService = require("./src/domain/services/ProductosService");
const productoControllerFactory = require("./src/aplication/controllers/ProductosController");
const sesionServiceFactory = require("./src/domain/services/SesionService");
const sesionControllerFactory = require("./src/aplication/controllers/SesionController");

// Logger
const logger = {
    info: (msg, data) => console.log(`[INFO] ${new Date().toISOString()} ${msg}`, data || ""),
    error: (msg, err) => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`, err || ""),
    warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} ${msg}`),
    debug: (msg) => console.log(`[DEBUG] ${new Date().toISOString()} ${msg}`)
};

// Inicializar servicios y controladores
const sesionService = sesionServiceFactory(logger);
const sesionController = sesionControllerFactory(sesionService, logger);
const productoController = productoControllerFactory(
    productoService(productoRepository),
    logger
);

const app = express();

// Configuración de sesión con MySQL Store (recomendado para producción)

app.use(session({
    name: 'session_cookie',
    secret: process.env.SESSION_SECRET || 'secreto_super_seguro_cambiar_en_produccion',
    resave: false,
    saveUninitialized: false,
    rolling: true, // Renovar cookie en cada request
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // HTTPS en producción
        httpOnly: true, // No accesible desde JavaScript
        maxAge: 3600*1000, // 1 hora
        sameSite: 'none'
    }
}));

// Middlewares
app.use(cors({
    origin: 'https://lucasaim21.github.io',
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para inyectar controladores
app.use((req, res, next) => {
    // Inyectar controladores
    req.sessionController = sesionController;
    req.productoController = productoController; // Si también lo necesitas
    next();
});

// Servir archivos estáticos
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

// ================= RUTAS =================

// Ruta de salud
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        session: req.sessionID ? "Session ID presente" : "Sin sesión"
    });
});

// Ruta de sesión
app.use("/api/sesion", sesionRoutes);

// Ruta de productos (protegida por middleware en las rutas específicas)
app.use("/api/productos", productosRoutes);

// Ruta de prueba de sesión
app.get("/api/test-session", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.json({
            views: req.session.views,
            sessionId: req.sessionID,
            autenticado: req.session.autenticado || false
        });
    } else {
        req.session.views = 1;
        res.json({ 
            message: "Primera visita",
            sessionId: req.sessionID 
        });
    }
});

// Manejo de errores global
app.use((err, req, res, next) => {
    logger.error("Error global:", err);
    
    // Errores de Multer (subida de archivos)
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: "Archivo demasiado grande (máximo 5MB)" });
    }
    
    if (err.message && err.message.includes("Solo se permiten imágenes")) {
        return res.status(400).json({ error: err.message });
    }
    
    // Error de sesión expirada
    if (err.name === 'SessionExpiredError') {
        return res.status(401).json({ error: "Sesión expirada" });
    }
    
    res.status(500).json({ 
        error: "Error interno del servidor",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Ruta 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📁 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 APP_PIN configurado: ${process.env.APP_PIN ? 'Sí' : 'No (usando default)'}`);
});
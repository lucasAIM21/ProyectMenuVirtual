const express = require("express");
const session = require("express-session"); // Asegúrate de tener express-session instalado
const cors = require("cors");
const path = require("path");

// Rutas
const productosRoutes = require("./routes/ProductosRoutes");
const sesionRoutes = require("./src/api/routers/SesionRouter"); // Nueva ruta de sesión

const app = express();

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 2 // 1 hora
    }
}));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes estáticas
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

// Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/sesion", sesionRoutes); // Nueva ruta para la sesión

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error("❌ Error global:", err);
    
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Error al subir archivo", details: err.message });
    }
    
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

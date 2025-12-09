const express = require("express");
const cors = require("cors");
const path = require("path");

// Rutas
const productosRoutes = require("./routes/ProductosRoutes");
// ... otras rutas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes estáticas
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

// Rutas
app.use("/api/productos", productosRoutes);
// ... otras rutas

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
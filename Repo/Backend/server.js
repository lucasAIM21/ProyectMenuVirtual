const express = require("express");
const path = require("path");
const productosRoutes = require("./routes/productos");
const categoriasRoutes = require("./routes/categorias");

const app = express();

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../Front")));

// Ruta de prueba simple
app.get("/api/test", (req, res) => {
    console.log("✅ Ruta /api/test funcionando");
    res.json({ status: "ok", message: "Server is working!" });
});

// Rutas de productos
app.use("/api/productos", productosRoutes);

app.use("/api/categorias", categoriasRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});

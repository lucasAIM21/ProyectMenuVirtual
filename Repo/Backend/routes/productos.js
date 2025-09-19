const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Conexión directa - misma que funciona en test-db.js
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "Liam_7687",
    database: "DB_Menu"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a MySQL en ruta:", err);
    } else {
        console.log("✅ MySQL conectado en ruta productos");
    }
});

// Ruta simple de prueba primero
router.get("/test", (req, res) => {
    console.log("✅ Ruta /test funcionando");
    res.json({ message: "Test exitoso", timestamp: new Date() });
});

// Ruta principal de productos
router.get("/", (req, res) => {
    console.log("📍 Petición GET /api/productos recibida");
    
    const query = `
        SELECT 
            p.ProductoID as id,
            p.nombre,
            p.Precio as precio,
            p.Ingredientes as descripcion,
            i.RutaImagen as imagen
        FROM Productos p
        LEFT JOIN Imagenes i ON p.ProductoID = i.ProductoID
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error en consulta SQL:", err);
            return res.status(500).json({ 
                error: "Error en base de datos",
                details: err.message 
            });
        }
        
        console.log("✅ Consulta exitosa. Enviando", results.length, "productos");
        res.json(results);
    });
});

module.exports = router;

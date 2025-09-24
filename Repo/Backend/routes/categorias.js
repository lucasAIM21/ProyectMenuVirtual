const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "Liam_7687",
    database: "DB_Menu"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error conectando a MySQL en ruta:", err);
    } else {
        console.log("✅ MySQL conectado en ruta categorias");
    }
});

router.get("/", (req, res) => {
    console.log("📍 Petición GET /api/categorias recibida");
    
    const query = `
        SELECT 
            c.CategoriaID as id,
            c.nombre,
            i.RutaImagen as imagen
        FROM Categoria c
        LEFT JOIN Imagenes i ON c.ImagenID = i.ImagenID
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error en consulta SQL:", err);
            return res.status(500).json({ 
                error: "Error en base de datos",
                details: err.message 
            });
        }
        
        console.log("✅ Consulta exitosa. Enviando", results.length, "categorias");
        res.json(results);
    });
});


module.exports = router;
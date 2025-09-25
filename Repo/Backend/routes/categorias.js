const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../config/db");

router.get("/", (req, res) => {
    console.log("📍 Petición GET /api/categorias recibida");
    
    const query = `
        SELECT 
            c.CategoriaId as id,
            c.nombre,
            i.RutaImagen as imagen
        FROM Categoria c
        LEFT JOIN ImgCategorias i ON c.ImgId = i.ImgId
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
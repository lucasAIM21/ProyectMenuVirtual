const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../config/db");

router.get("/", async (req, res) => {
    console.log("📍 Petición GET /api/categorias recibida");
    
    const query = `
        SELECT 
            c.CategoriaId as id,
            c.nombre,
            i.RutaImagen as imagen
        FROM Categoria c
        LEFT JOIN ImgCategorias i ON c.ImgId = i.ImgId
    `;
    
    try {
        const [rows] = await db.query(query); // ✅ sin callback
        res.json(rows);
    } catch (err) {
        console.error("❌ Error en la consulta:", err);
        res.status(500).json({ error: "Error en la consulta" });
    }
});


module.exports = router;
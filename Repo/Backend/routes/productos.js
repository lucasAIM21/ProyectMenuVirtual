const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
	try{
		console.log("Consultando productos");
		
		const [results]= await db.execute(`
			SELECT
		                p.ProductoID as id,
            			p.nombre,
          			p.Precio as precio,
            		p.Ingredientes as descripcion,
            		i.RutaImagen as imagen
        		FROM Productos p
        		LEFT JOIN Imagenes i ON p.ProductoID = i.ProductoID
		`);
		console.log("Productos encontrados: ",results.length);
		res.json(results);
	}catch (err){
		console.error("Error en consulta: ",err);
		res.status(500).json({
			error:"Error en base de datos",
			details : err.message
		});
	}
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

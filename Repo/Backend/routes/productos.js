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
        console.log("✅ MySQL conectado en ruta productos");
    }
});

router.get("/", (req, res) => {
    console.log("📍 Petición GET /api/productos recibida");
    
    const query = `
        SELECT 
            p.ProductoID as id,
            p.nombre,
            p.Precio as precio,
            p.Ingredientes as descripcion,
            i.RutaImagen as imagen,
            c.CategoriaID AS categoriaId,
            c.nombre AS categoriaNombre,
            ic.RutaImagen AS categoriaImagen
        FROM Productos p
        LEFT JOIN Categoria c ON p.CategoriaID = c.CategoriaID
        LEFT JOIN Imagenes i ON p.ProductoID = i.ProductoID
        LEFT JOIN Imagenes ic ON c.ImagenID = ic.ImagenID
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


// Crear un nuevo producto
router.post("/", (req, res) => {
    const { nombre, precio, descripcion, imagen, CategoriaId } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const query = "INSERT INTO Productos (nombre, Precio, Ingredientes,CategoriaID) VALUES (?, ?, ?, ?)";
    db.query(query, [nombre, precio,descripcion,CategoriaId], (err, result) => {
        if (err) {
            console.error("❌ Error al crear producto:", err);
            return res.status(500).json({ error: "Error en base de datos", details: err.message });
        }
        // Si hay imagen, insertar en tabla Imagenes
        if (imagen) {
            const productoId = result.insertId;
            const queryImg = "INSERT INTO Imagenes (ProductoID, RutaImagen) VALUES (?, ?)";
            db.query(queryImg, [productoId, imagen], (err2) => {
                if (err2) {
                    console.error("❌ Error al guardar imagen:", err2);
                }
            });
        }
        res.status(201).json({ message: "Producto creado", id: result.insertId });
    });
});

// Modificar un producto existente
router.put("/:id", (req, res) => {
    const { nombre, precio, descripcion, imagen } = req.body;
    const { id } = req.params;
    const query = "UPDATE Productos SET nombre = ?, Precio = ?, Ingredientes = ? WHERE ProductoID = ?";
    db.query(query, [nombre, precio, descripcion, id], (err, result) => {
        if (err) {
            console.error("❌ Error al modificar producto:", err);
            return res.status(500).json({ error: "Error en base de datos", details: err.message });
        }
        // Si hay imagen, actualizar o insertar en tabla Imagenes
        if (imagen) {
            const queryImg = "INSERT INTO Imagenes (ProductoID, RutaImagen) VALUES (?, ?)";
            db.query(queryImg, [id, imagen], (err2) => {
                if (err2) {
                    console.error("❌ Error al actualizar imagen:", err2);
                }
            });
        }
        res.json({ message: "Producto modificado" });
    });
});

module.exports = router;

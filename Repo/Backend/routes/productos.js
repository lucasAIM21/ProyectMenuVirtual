const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

// 📂 Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../imgs/imgP"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, webp)"));
        }
    }
});

// ==================== GET PRODUCTOS ====================
router.get("/", async (req, res) => {
    console.log("📍 Petición GET /api/productos recibida");

    const query = `
        SELECT 
            p.ProductoId as id,
            p.nombre,
            p.Precio as precio,
            p.Ingredientes as descripcion,
            i.RutaImagen as imagen,
            c.CategoriaId AS categoriaId,
            c.nombre AS categoriaNombre,
            ic.RutaImagen AS categoriaImagen
        FROM Productos p
        LEFT JOIN Categoria c ON p.CategoriaId = c.CategoriaId
        LEFT JOIN ImgProductos i ON p.ProductoId = i.ProductoId
        LEFT JOIN ImgCategorias ic ON c.ImgId = ic.ImgId
    `;

    try {
        const [results] = await db.query(query);

        const productos = results.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            descripcion: p.descripcion,
            imagen: p.imagen,
            categoria: p.categoriaId ? {
                id: p.categoriaId,
                nombre: p.categoriaNombre,
                icono: p.categoriaImagen
            } : null
        }));

        console.log("✅ Consulta exitosa. Enviando", productos.length, "productos");
        res.json(productos);
    } catch (err) {
        console.error("❌ Error en la consulta:", err);
        res.status(500).json({ error: "Error en la consulta" });
    }
});

// ==================== POST PRODUCTO ====================
router.post("/", upload.single("imagen"), async (req, res) => {
    const { nombre, precio, descripcion, CategoriaId } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
        // Insertar producto
        const [result] = await db.query(
            "INSERT INTO Productos (nombre, Precio, Ingredientes, CategoriaId) VALUES (?, ?, ?, ?)",
            [nombre, precio, descripcion, CategoriaId]
        );

        // Si hay imagen, guardarla en ImgProductos
        if (req.file) {
            const rutaImagen = "/imgs/imgP/" + req.file.filename;
            await db.query(
                "INSERT INTO ImgProductos (ProductoId, RutaImagen) VALUES (?, ?)",
                [result.insertId, rutaImagen]
            );
        }

        res.status(201).json({ message: "Producto creado", id: result.insertId });
    } catch (err) {
        console.error("❌ Error al crear producto:", err);
        res.status(500).json({ error: "Error en base de datos", details: err.message });
    }
});

// ==================== PUT PRODUCTO ====================
router.put("/:id", upload.single("imagen"), async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const { id } = req.params;

    try {
        // Actualizar producto
        await db.query(
            "UPDATE Productos SET nombre = ?, Precio = ?, Ingredientes = ? WHERE ProductoId = ?",
            [nombre, precio, descripcion, id]
        );

        // Si hay nueva imagen, actualizar o insertar
        if (req.file) {
            const rutaImagen = "/imgs/imgP/" + req.file.filename;

            // Checar si ya existe imagen para este producto
            const [rows] = await db.query(
                "SELECT ImgId FROM ImgProductos WHERE ProductoId = ?",
                [id]
            );

            if (rows.length > 0) {
                await db.query(
                    "UPDATE ImgProductos SET RutaImagen = ? WHERE ProductoId = ?",
                    [rutaImagen, id]
                );
            } else {
                await db.query(
                    "INSERT INTO ImgProductos (ProductoId, RutaImagen) VALUES (?, ?)",
                    [id, rutaImagen]
                );
            }
        }

        res.json({ message: "Producto modificado" });
    } catch (err) {
        console.error("❌ Error al modificar producto:", err);
        res.status(500).json({ error: "Error en base de datos", details: err.message });
    }
});

// ==================== DELETE PRODUCTO ====================
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar primero la imagen asociada (si existe)
        await db.query("DELETE FROM ImgProductos WHERE ProductoId = ?", [id]);

        // Luego eliminar el producto
        const [result] = await db.query("DELETE FROM Productos WHERE ProductoId = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        console.error("❌ Error al eliminar producto:", err);
        res.status(500).json({ error: "Error en base de datos", details: err.message });
    }
});


module.exports = router;

const db = require("../../../config/db");

const productoRepository = {
    // 📋 Obtener todos los productos con sus relaciones
    findAll: async () => {
        const query = `
            SELECT 
                p.ProductoId as id,
                p.nombre,
                p.Precio as precio,
                p.Ingredientes as descripcion,
                p.cantidad,
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
            return results;
        } catch (err) {
            throw new Error(`Error en consulta de productos: ${err.message}`);
        }
    },

    // ➕ Crear un nuevo producto
    create: async (productoData) => {
        const { nombre, precio, descripcion, cantidad, CategoriaId } = productoData;
        
        try {
            const [result] = await db.query(
                "INSERT INTO Productos (nombre, Precio, Ingredientes, cantidad, CategoriaId) VALUES (?, ?, ?, ?, ?)",
                [nombre, precio, descripcion, cantidad, CategoriaId]
            );
            
            return { id: result.insertId, ...productoData };
        } catch (err) {
            throw new Error(`Error al crear producto: ${err.message}`);
        }
    },

    // 📍 Encontrar por ID
    findById: async (id) => {
        try {
            const [rows] = await db.query(
                "SELECT * FROM Productos WHERE ProductoId = ?",
                [id]
            );
            return rows[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar producto: ${err.message}`);
        }
    },

    // ✏️ Actualizar producto
    update: async (id, productoData) => {
        const { nombre, precio, descripcion, cantidad } = productoData;
        
        try {
            const [result] = await db.query(
                "UPDATE Productos SET nombre = ?, Precio = ?, Ingredientes = ?, cantidad = ? WHERE ProductoId = ?",
                [nombre, precio, descripcion, cantidad, id]
            );
            
            return result.affectedRows > 0;
        } catch (err) {
            throw new Error(`Error al actualizar producto: ${err.message}`);
        }
    },

    // 🗑️ Eliminar producto
    delete: async (id) => {
        try {
            // Primero eliminar imagen asociada
            await db.query("DELETE FROM ImgProductos WHERE ProductoId = ?", [id]);
            
            // Luego eliminar producto
            const [result] = await db.query("DELETE FROM Productos WHERE ProductoId = ?", [id]);
            
            return result.affectedRows > 0;
        } catch (err) {
            throw new Error(`Error al eliminar producto: ${err.message}`);
        }
    },

    // 🖼️ Guardar o actualizar imagen
    saveImage: async (productoId, rutaImagen) => {
        try {
            // Verificar si ya existe imagen
            const [rows] = await db.query(
                "SELECT ImgId FROM ImgProductos WHERE ProductoId = ?",
                [productoId]
            );

            if (rows.length > 0) {
                // Actualizar
                await db.query(
                    "UPDATE ImgProductos SET RutaImagen = ? WHERE ProductoId = ?",
                    [rutaImagen, productoId]
                );
            } else {
                // Insertar nueva
                await db.query(
                    "INSERT INTO ImgProductos (ProductoId, RutaImagen) VALUES (?, ?)",
                    [productoId, rutaImagen]
                );
            }
            
            return rutaImagen;
        } catch (err) {
            throw new Error(`Error al guardar imagen: ${err.message}`);
        }
    }
};

module.exports = productoRepository;
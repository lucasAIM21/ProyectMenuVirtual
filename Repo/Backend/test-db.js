const mysql = require("mysql2");

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "Liam_7687",
    database: "DB_Menu"
});

console.log("🔍 Probando conexión a MySQL...");

db.connect(err => {
    if (err) {
        console.error("❌ Error conectando:", err);
        return;
    }
    console.log("✅ Conectado a MySQL");
    
    // Probamos una consulta simple
    db.query("SELECT 1 + 1 as result", (err, results) => {
        if (err) {
            console.error("❌ Error en consulta simple:", err);
            return;
        }
        console.log("✅ Consulta simple exitosa:", results);
        
        // Probamos la consulta real
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
                console.error("❌ Error en consulta productos:", err);
                return;
            }
            console.log("✅ Consulta productos exitosa. Resultados:", results.length);
            console.log("Primer producto:", results[0]);
        });
        
        db.end();
    });
});

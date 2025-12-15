const db = require("../../../config/db");

const categoriaRepository={

    findAll: async ()=>{
        const query=`
            SELECT
                c.CategoriaId as id,
                c.nombre,
                i.RutaImagen as imagen
            FROM Categoria c
            LEFT JOIN ImgCategorias i ON c.ImgId = i.ImgId
            `;
        try{
            const [results] = await db.query(query);
            return results;
        }catch(err){
            throw new Error(`Error en consulta de categorias: ${err.message}`)
        }
    }
}

module.exports=categoriaRepository;
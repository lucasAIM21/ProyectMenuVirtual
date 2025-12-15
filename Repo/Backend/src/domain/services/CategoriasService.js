const categoriaService = (categoriaRepository)=>({
    obtenerCategorias: async ()=>{
        const resultado = await categoriaRepository.findAll();

        return resultado.map(c=>({
            id: c.id,
            nombre: c.nombre,
            imagen: c.imagen
        }));
    }
});

module.exports=categoriaService;

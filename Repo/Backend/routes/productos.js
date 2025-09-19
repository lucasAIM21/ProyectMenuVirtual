const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/",(req,res) => {

	const query= `
		select
			p.ProductoID as id,
			p.combre,
			p.Precio as precio,
			P.Ingredientes as descripcion,
			i.RutaImagen as imagen
		from productos p
		left join imagenes i on p.ProductoID=i.ProductoID	
	`;

	db.query("SELECT * FROM Productos",(err,results) => {
		if(err){
			return res.status(500).json({error: "Error en la consulta"});
		}
		
	res.json(productos);
	});
});

module.exports=router;

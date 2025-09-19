const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/",(req,res) => {
	console.log("peticion recibida en api/productos");

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

	console.log("Ejecutando consulta sql");

	db.query("SELECT * FROM Productos",(err,results) => {
		if(err){
			console.log("Error en consulta sql",err);
			return res.status(500).json({error: "Error en la consulta"});
		}

		console.log("consulta exitosa");
		
	res.json(productos);
	});
});

module.exports=router;

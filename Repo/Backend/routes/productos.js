const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/",(req,res) => {
	db.query("SELECT * FROM Productos",(err,results) => {
		if(err){
			return res.status(500).json({error: "Error en la consulta"});
		}
		const productos=results.map(producto => ({
			...producto,
			imagen: `/imgs/${producto.imagen}`
		}));
	res.json(productos);
	});
});

module.exports=router;

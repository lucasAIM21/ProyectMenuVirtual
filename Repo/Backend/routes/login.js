const express = require("express");
const router =express.router();

const APP_PIN = process.env.APP_PIN;
const horas = 0.01;

router.post("/login",(req,res) => {
	const {pin} = req.body;
	if(pin==APP_PIN){
		const ahora =Date.now();
		res.json({success:true, sesion:ahora, horas:0.01});
	}else{
		res.status(401).json({success:false, messabe: "PIN incorrecto"});
	}
});

module.exports=Router;

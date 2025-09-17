const express = require("express");
const {exec} = require("child_process");

const app = express();
app.use(express.json());

app.post("/webhook",(req,res) => {
	console.log("webhook recibido: ",req.body);
	exec("cd /home/usuario/ProyectoMenuVirtual/Backend && git pull origin main && npm install && pm2 restart menu-backend",(err,stdout,stderr)=>{
	if(err){
		console.error("Error ejecutando actualizacion: ",err);
		return res.status(500).send("Error en actualizacion");
	}
	console.log("Actualizacion completada", stdout);
	res.status(200).send("OK");
	});
});

app.listen(4000, ()=> {
	console.log("Webhook escuchado en http://localhost:4000/webhook");
});

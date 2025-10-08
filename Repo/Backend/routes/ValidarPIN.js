const express = require("express");
const router = express.Router();

const PINC=process.env.APP_PIN;

router.post("/", (req, res) => {
    const {pin} = req.body;
    if(!pin){
        return res.status(400).json({success:false,messaje:"Falta el PIN"});
    }
    if(pin===PINC){
        req.session.autenticado=true;
        return res.json({success:true, messaje: "PIN COrrecto"});
    } else{
        return res.status(401).json({success:false,messaje:"PIN incorrecto"});
    }
});

router.get("/ValidarSesion",(req,res)=>{0
    if(req.session.autenticado){
        res.json({autenticado:true});
    }else{
        res.json({autenticado:false});
    }
});

module.exports=router;
const express = require("express");
const router = express.Router();

const PINC=Process.env.APP_PIN;

router.post("/ValidarPIN", (req, res) => {
    const {pin} = req.body;
    if(!pin){
        return res.status(400).json({success:false,messaje:"Falta el PIN"});
    }
    if(pin===PINC){
        return res.json({sucess:true, messaje: "PIN COrrecto"});
    } else{
        return res.status(401).json({sucess:false,messaje:"PIN incorrecto"});
    }
});

module.exports=router;
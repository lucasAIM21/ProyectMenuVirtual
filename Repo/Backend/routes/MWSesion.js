function ValidarSesion(req,res,next){
    if(req.session && req.session.autenticado){
        next();
    }else{
        res.status(401).json({error:"Sesion no valida o expirada"});
    }
}

MediaSourceHandle.exports=ValidarSesion;
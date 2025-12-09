const authMiddleware = (req, res, next) => {
    if(req.session && req.session.autenticado){
        next();
    } else {
        res.status(401).json({ error: "Sesión no válida o expirada" });
    }
};

module.exports = authMiddleware;
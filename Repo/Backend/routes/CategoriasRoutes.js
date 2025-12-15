const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.categoriaController.obtenerCategorias(req, res);
});

module.exports = router;

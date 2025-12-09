const express = require("express");
const router = express.Router();

// Inyección de dependencias (ver más abajo cómo se conecta)
const sesionService = require("../../domain/services/sesion.service")();
const sesionControllerFactory = require("../../application/controllers/sesion.controller");
const logger = require("../../shared/logger");

const sesionController = sesionControllerFactory(sesionService, logger);

router.post("/", sesionController.validarPIN);
router.get("/", sesionController.estadoSesion);

module.exports = router;
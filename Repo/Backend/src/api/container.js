// src/container.js
const productoRepository = require("./infrastructure/repositories/producto.repository");
const productoService = require("./domain/services/producto.service");
const productoController = require("./application/controllers/producto.controller");

const logger = require("./shared/logger");

module.exports = {
    productoController: productoController(
        productoService(productoRepository),
        logger
    )
};
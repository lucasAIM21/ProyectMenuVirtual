-- =====================================================
-- EXTENSIÓN DE BD: PEDIDOS Y RELACIÓN CON PRODUCTOS
-- Proyecto: ProyectMenuVirtual
-- Base de datos: DB_Menu
-- MySQL 8.x
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =========================
-- TABLA: ESTADO
-- =========================
CREATE TABLE IF NOT EXISTS ESTADO (
    EstadoId INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (EstadoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- TABLA: TIPOPAGO
-- =========================
CREATE TABLE IF NOT EXISTS TIPOPAGO (
    TipoPagoId INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (TipoPagoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- TABLA: PEDIDOS
-- =========================
CREATE TABLE IF NOT EXISTS PEDIDOS (
    PedidoId INT NOT NULL AUTO_INCREMENT,
    NroMesa INT NOT NULL,
    FechaHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Monto DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    EstadoId INT NOT NULL,
    TipoPagoId INT NOT NULL,

    PRIMARY KEY (PedidoId),

    CONSTRAINT FK_Pedidos_Estado
        FOREIGN KEY (EstadoId)
        REFERENCES ESTADO(EstadoId),

    CONSTRAINT FK_Pedidos_TipoPago
        FOREIGN KEY (TipoPagoId)
        REFERENCES TIPOPAGO(TipoPagoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- TABLA: PRODUCTOS_DEL_PEDIDO
-- (Relación N:M Pedido ↔ Productos)
-- =========================
CREATE TABLE IF NOT EXISTS PRODUCTOS_DEL_PEDIDO (
    ProductosDelPedidoId INT NOT NULL AUTO_INCREMENT,

    PedidoId INT NOT NULL,
    ProductoId INT NOT NULL,

    Cantidad INT NOT NULL DEFAULT 1,
    PrecioUnitario DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (ProductosDelPedidoId),

    CONSTRAINT FK_PDP_Pedido
        FOREIGN KEY (PedidoId)
        REFERENCES PEDIDOS(PedidoId)
        ON DELETE CASCADE,

    CONSTRAINT FK_PDP_Producto
        FOREIGN KEY (ProductoId)
        REFERENCES Productos(ProductoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================
-- DATOS INICIALES (CATÁLOGOS)
-- =========================
INSERT INTO ESTADO (Nombre)
SELECT 'PENDIENTE' WHERE NOT EXISTS (
    SELECT 1 FROM ESTADO WHERE Nombre = 'PENDIENTE'
);

INSERT INTO ESTADO (Nombre)
SELECT 'PAGADO' WHERE NOT EXISTS (
    SELECT 1 FROM ESTADO WHERE Nombre = 'PAGADO'
);

INSERT INTO ESTADO (Nombre)
SELECT 'CANCELADO' WHERE NOT EXISTS (
    SELECT 1 FROM ESTADO WHERE Nombre = 'CANCELADO'
);

INSERT INTO TIPOPAGO (Nombre)
SELECT 'EFECTIVO' WHERE NOT EXISTS (
    SELECT 1 FROM TIPOPAGO WHERE Nombre = 'EFECTIVO'
);

INSERT INTO TIPOPAGO (Nombre)
SELECT 'YAPE' WHERE NOT EXISTS (
    SELECT 1 FROM TIPOPAGO WHERE Nombre = 'YAPE'
);

INSERT INTO TIPOPAGO (Nombre)
SELECT 'PLIN' WHERE NOT EXISTS (
    SELECT 1 FROM TIPOPAGO WHERE Nombre = 'PLIN'
);

INSERT INTO TIPOPAGO (Nombre)
SELECT 'TARJETA' WHERE NOT EXISTS (
    SELECT 1 FROM TIPOPAGO WHERE Nombre = 'TARJETA'
);

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

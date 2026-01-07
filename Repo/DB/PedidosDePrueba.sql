INSERT INTO PEDIDOS (NroMesa, Monto, EstadoId, TipoPagoId)
VALUES (3, 24.00, 1, 1);

SET @PedidoId = LAST_INSERT_ID();

INSERT INTO PRODUCTOS_DEL_PEDIDO (PedidoId, ProductoId, Cantidad, PrecioUnitario)
VALUES (@PedidoId, 2, 3, 10.00), (@PedidoId, 1, 1, 12.00);
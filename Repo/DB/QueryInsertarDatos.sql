USE DB_Menu;

INSERT INTO ImgProductos(RutaImagen,ProductoId) VALUES
	('/imgs/imgP/Chaufa.jpg',NULL),('/imgs/imgP/ArrozConPollo.jpeg',NULL),('/imgs/imgP/PolloALaBrasa.jpg',NULL);
INSERT INTO ImgCategorias(RutaImagen) VALUES
	('/imgs/imgC/PlatoFuerte.png',NULL);
INSERT INTO Categoria(nombre,ImgId) VALUES 
	('Plato Fuerte',1);
INSERT INTO Productos(nombre,Precio,Ingredientes,CategoriaId) VALUES
	('Chaufa',12.00,'Arroz, pollo, cebolla  china, sillao',1),
	('Arroz con pollo',10.00,'Arroz, verduras, pollo, papas, crema',1);
	('Pollo a la brasa',15.00,'Pollo, papas fritas, ensalada',1);
	
UPDATE ImgProductos SET ProductoID = 1 WHERE ImagenID = 1;

UPDATE ImgProductos SET ProductoID = 2 WHERE ImagenID = 2;

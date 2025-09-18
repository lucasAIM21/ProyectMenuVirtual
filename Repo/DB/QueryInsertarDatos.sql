USE DB_Menu;

INSERT INTO Imagenes(RutaImagen,ProductoID) VALUES
	('/imgs/Chaufa.jpg',NULL),('/imgs/ArrozConPollo.jpeg',NULL),('/imgs/PolloALaBrasa.jpg',NULL);
INSERT INTO Categoria(nombre,ImagenID) VALUES 
	('Plato Fuerte',3);
INSERT INTO Productos(nombre,Precio,Ingredientes,CategoriaID) VALUES
	('Chaufa',12.00,'Arroz, pollo, cebolla  china, sillao',1),
	('Arroz con pollo',10.00,'Arroz, verduras, pollo, papas, crema',1);
UPDATE Imagenes SET ProductoID = 1 WHERE ImagenID = 1;

UPDATE Imagenes SET ProductoID = 2 WHERE ImagenID = 2;

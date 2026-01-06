INSERT INTO ImgCategorias(RutaImagen) VALUES
	('/imgs/imgC/PlatoFuerte.png');
INSERT INTO Categoria(nombre,ImgId) VALUES 
	('Plato Fuerte',LAST_INSERT_ID());

-- Crear la base de datos
CREATE DATABASE DB_Menu;
USE DB_Menu;

-- Tabla Imagenes
CREATE TABLE ImgProductos (
    ImgId INT AUTO_INCREMENT PRIMARY KEY,
    RutaImagen VARCHAR(255) NOT NULL,
    ProductoId INT NULL
);

CREATE TABLE ImgCategorias (
    ImgId INT AUTO_INCREMENT PRIMARY KEY,
    RutaImagen VARCHAR(255) NOT NULL,
);

-- Tabla Categoria
CREATE TABLE Categoria (
    CategoriaId INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ImgId INT NULL,
    FOREIGN KEY (ImgId) REFERENCES ImgCategorias(ImgId)
);

-- Tabla Productos
CREATE TABLE Productos (
    ProductoId INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Ingredientes VARCHAR(500) NOT NULL,
    CategoriaId INT NOT NULL,
    FOREIGN KEY (CategoriaId) REFERENCES Categoria(CategoriaId)
);


-- Crear la base de datos
CREATE DATABASE DB_Menu;
USE DB_Menu;

DROP TABLE IF EXISTS `Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categoria` (
  `CategoriaId` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `ImgId` int DEFAULT NULL,
  PRIMARY KEY (`CategoriaId`),
  KEY `ImgId` (`ImgId`),
  CONSTRAINT `Categoria_ibfk_1` FOREIGN KEY (`ImgId`) REFERENCES `ImgCategorias` (`ImgId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ImgCategorias`
--

DROP TABLE IF EXISTS `ImgCategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImgCategorias` (
  `ImgId` int NOT NULL AUTO_INCREMENT,
  `RutaImagen` varchar(255) NOT NULL,
  PRIMARY KEY (`ImgId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ImgProductos`
--

DROP TABLE IF EXISTS `ImgProductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImgProductos` (
  `ImgId` int NOT NULL AUTO_INCREMENT,
  `RutaImagen` varchar(255) NOT NULL,
  `ProductoId` int DEFAULT NULL,
  PRIMARY KEY (`ImgId`),
  KEY `FK_ImgProductos_Productos` (`ProductoId`),
  CONSTRAINT `FK_ImgProductos_Productos` FOREIGN KEY (`ProductoId`) REFERENCES `Productos` (`ProductoId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Productos`
--

DROP TABLE IF EXISTS `Productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Productos` (
  `ProductoId` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Ingredientes` varchar(500) NOT NULL,
  `CategoriaId` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`ProductoId`),
  KEY `CategoriaId` (`CategoriaId`),
  CONSTRAINT `Productos_ibfk_1` FOREIGN KEY (`CategoriaId`) REFERENCES `Categoria` (`CategoriaId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


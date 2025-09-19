const express = require("express");
const path = require("path");
const productosRoutes = require("./routes/productos");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"../Front")));

app.use("/api/productos",productosRoutes);

const PORT = 3000;
app.listen(PORT,() => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);

});

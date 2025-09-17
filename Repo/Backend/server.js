const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use("/imgs", express.static(path.join(_dirname,"../uploads")));

const productosRoutes = require("./routes/productos");
app.use("/productos",productosRoutes);

const PORT = 3000;
app.listen(PORT,() => {
	console.log('Servidor corriendo en https://localhost:${PORT}');

});

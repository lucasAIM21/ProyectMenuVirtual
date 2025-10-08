require("dotenv").config();
const express = require("express");
const path = require("path");
const sesion = require("express-session");
const productosRoutes = require("./routes/productos");
const categoriasRoutes = require("./routes/categorias");
const ValidarPINRoutes = require("./routes/ValidarPIN")

const cors = require("cors");

const app = express();
app.set("trust proxy",1);

app.use(cors({
    origin: 'https://lucasaim21.github.io',
    credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://lucasaim21.github.io");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Si es preflight, respondemos inmediatamente
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(sesion({
    secret: process.env.SESSION_SECRET || "Clave",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly:true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 1000
    }
}));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../Front")));
app.use('/imgs', express.static(path.join(__dirname, '../imgs')));

// Ruta de prueba simple
app.get("/api/test", (req, res) => {
    console.log("✅ Ruta /api/test funcionando");
    res.json({ status: "ok", message: "Server is working!" });
});

// Rutas de productos
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api", ValidarPINRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});

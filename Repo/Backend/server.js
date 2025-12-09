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
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(sesion({
    secret: process.env.SESSION_SECRET || "Clave",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly:true,
        secure: true,
        sameSite: 'none',
        maxAge: 120 * 1000
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


app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/ValidarPIN", ValidarPINRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});

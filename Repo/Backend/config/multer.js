// 📂 Configuración de multer
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../imgs/imgP"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// 👉 Crear instancia de multer con este storage
const upload = multer({ storage });

// 👉 Exportar correctamente
module.exports = upload;

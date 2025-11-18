const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rafael',
    database: 'monstruos_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado a MySQL");
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, "..")));
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


app.post('/monstruos', upload.single('imagen'), (req, res) => {
    const { nombre, tipo, habitat, descripcion } = req.body;
    const imgPath = 'uploads/' + req.file.filename;

    const query = `
        INSERT INTO monstruos (nombre, tipo, habitat, img, descripcion)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, tipo, habitat, imgPath, descripcion], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error al insertar" });
        }
        res.json({ mensaje: "Monstruo agregado correctamente" });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});



const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const db = require("../config/db");

const ValidarPIN= require("./MWSesion");

router.get("/", async (req, res) => {
    console.log("📍 Petición GET /api/categorias recibida");
    
    const query = `
        SELECT 
            c.CategoriaId as id,
            c.nombre,
            i.RutaImagen as imagen
        FROM Categoria c
        LEFT JOIN ImgCategorias i ON c.ImgId = i.ImgId
    `;
    
    try {
        const [rows] = await db.query(query); // ✅ sin callback
        res.json(rows);
    } catch (err) {
        console.error("❌ Error en la consulta:", err);
        res.status(500).json({ error: "Error en la consulta" });
    }
});

router.post("/",ValidarPIN,async (req,res)=>{
    const {nombre}=req.body;
    if(!nombre){
        return res.status(400).json({error:"No se ingreso un nombre"});
    }
    try{
        const [result]=await db.query(
            "insert into Categoria (nombre) values (?)",[nombre]
        );
        res.status(201).json({success:true, messaje:"Categoria agregada" });

    }catch(err){
        res.status(500).json({error:"Error al insertar en la BD"});
    }
});

router.delete("/:id",ValidarPIN,async (req,res)=>{
    const {id}=req.params;
    try{
        const [result]=await db.query(
            "delete from Categoria where CategoriaId=?",[id]
        );
        if(result.affectedRows===0){
            return res.status(404).json({error:"Categoria no encontrada"});
        }
        res.json({success:true,messaje:"Categoria eliminada"});
    }catch(err){
        return res.status(500).json({error:"Error al eliminar categoria"});
    }

});


module.exports = router;
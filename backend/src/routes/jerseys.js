// ============================================================
// routes/jerseys.js — Reservas de Camisetas (MySQL)
// ============================================================
const router = require('express').Router();
const pool = require('../db');

// POST /api/jerseys/reserve
router.post('/reserve', async (req, res) => {
  const { modelo, nombre, correo, celular, talla, cantidad } = req.body;
  
  // Validación básica
  if (!modelo || !nombre || !correo || !celular || !talla || !cantidad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO reservas_camisetas (modelo, nombre, correo, celular, talla, cantidad) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        modelo.trim(), 
        nombre.trim(), 
        correo.trim().toLowerCase(), 
        celular.trim(), 
        talla.trim(), 
        parseInt(cantidad)
      ]
    );

    res.status(201).json({ 
      message: 'Reserva registrada exitosamente', 
      id: result.insertId 
    });
  } catch (err) {
    console.error('Error al guardar reserva de camiseta:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

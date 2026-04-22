// ============================================================
// routes/sponsors.js — Patrocinadores (MySQL + Hardened)
// ============================================================
const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');

// ────────────────────────────────────────────────────────────
// GET /api/sponsors — Listar activos (PÚBLICO)
// ────────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nombre, tipo, logo_url, sitio_web FROM patrocinadores WHERE activo = 1 ORDER BY tipo, nombre'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error listando patrocinadores:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ────────────────────────────────────────────────────────────
// POST /api/sponsors — Crear patrocinador [ADMIN - JWT]
// ────────────────────────────────────────────────────────────
router.post('/',
  verifyToken,
  body('nombre')
    .trim()
    .notEmpty().withMessage('Nombre es requerido')
    .isLength({ max: 150 }).withMessage('Nombre demasiado largo'),
  body('tipo')
    .isIn(['alcaldia', 'empresa', 'persona']).withMessage('Tipo inválido'),
  body('logo_url')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 }),
  body('sitio_web')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 300 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { nombre, tipo, logo_url, sitio_web } = req.body;

    try {
      const [result] = await pool.execute(
        'INSERT INTO patrocinadores (nombre, tipo, logo_url, sitio_web) VALUES (?, ?, ?, ?)',
        [nombre.trim(), tipo, logo_url || null, sitio_web || null]
      );

      res.status(201).json({ id: result.insertId, message: 'Patrocinador agregado correctamente' });
    } catch (err) {
      console.error('Error creando patrocinador:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// ────────────────────────────────────────────────────────────
// DELETE /api/sponsors/:id — Desactivar [ADMIN - JWT]
// ────────────────────────────────────────────────────────────
router.delete('/:id',
  verifyToken,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const [result] = await pool.execute(
        'UPDATE patrocinadores SET activo = 0 WHERE id = ? AND activo = 1',
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Patrocinador no encontrado' });
      }

      res.json({ message: 'Patrocinador desactivado' });
    } catch (err) {
      console.error('Error desactivando patrocinador:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

module.exports = router;

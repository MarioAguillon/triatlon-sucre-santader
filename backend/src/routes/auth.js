// ============================================================
// routes/auth.js — Autenticación Admin (MySQL + Hardened)
// ============================================================
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool   = require('../db');

/**
 * POST /api/auth/login
 * Body: { usuario, password }
 * — Valida contra la tabla `admins` en MySQL
 * — Rate-limited desde index.js (5 intentos / 15 min)
 */
router.post('/login',
  // Sanitización y validación de inputs
  body('usuario')
    .trim()
    .notEmpty().withMessage('Usuario es requerido')
    .isLength({ max: 50 }).withMessage('Usuario demasiado largo')
    .escape(),
  body('password')
    .notEmpty().withMessage('Contraseña es requerida')
    .isLength({ max: 128 }).withMessage('Contraseña demasiado larga'),
  async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { usuario, password } = req.body;

    try {
      // Consulta segura con prepared statement (previene SQL Injection)
      const [rows] = await pool.execute(
        'SELECT id, usuario, password_hash, nombre FROM admins WHERE usuario = ? LIMIT 1',
        [usuario]
      );

      if (rows.length === 0) {
        // Mensaje genérico para no revelar si el usuario existe o no
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const admin = rows[0];
      const valid = await bcrypt.compare(password, admin.password_hash);

      if (!valid) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Verificar que JWT_SECRET esté configurado
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('❌ FATAL: JWT_SECRET no definido');
        return res.status(500).json({ error: 'Error de configuración del servidor' });
      }

      const token = jwt.sign(
        { id: admin.id, usuario: admin.usuario, nombre: admin.nombre },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
      );

      res.json({
        token,
        admin: { id: admin.id, usuario: admin.usuario, nombre: admin.nombre }
      });
    } catch (err) {
      console.error('Error en login:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

/**
 * GET /api/auth/me — Verificar token actual
 * Usado por el frontend AuthGuard para validar sesión
 */
const { verifyToken } = require('../middleware/auth');

router.get('/me', verifyToken, (req, res) => {
  res.json({
    admin: { id: req.admin.id, usuario: req.admin.usuario, nombre: req.admin.nombre }
  });
});

module.exports = router;

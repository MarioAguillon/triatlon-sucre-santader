// ============================================================
// routes/auth.js — Autenticación Admin (modo temporal sin BD)
// ============================================================
const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

// ── Admin temporal en memoria ───────────────────────────────
// Contraseña por defecto: "admin123"
const ADMIN_TEMPORAL = {
  id: 1,
  usuario: 'admin',
  password_hash: bcrypt.hashSync('admin123', 10),
  nombre: 'Administrador',
};

/**
 * POST /api/auth/login
 * Body: { usuario, password }
 */
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  try {
    if (usuario !== ADMIN_TEMPORAL.usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const valid = await bcrypt.compare(password, ADMIN_TEMPORAL.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: ADMIN_TEMPORAL.id, usuario: ADMIN_TEMPORAL.usuario, nombre: ADMIN_TEMPORAL.nombre },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      admin: { id: ADMIN_TEMPORAL.id, usuario: ADMIN_TEMPORAL.usuario, nombre: ADMIN_TEMPORAL.nombre }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

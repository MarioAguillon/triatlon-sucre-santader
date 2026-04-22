// ============================================================
// middleware/auth.js — JWT Middleware (Hardened)
// ============================================================
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Seguridad: no permitir arranque sin JWT_SECRET configurado
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('❌ FATAL: JWT_SECRET no está definido en las variables de entorno');
    return res.status(500).json({ error: 'Error de configuración del servidor' });
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autorización requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado. Inicia sesión nuevamente.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Token inválido o manipulado' });
    }
    return res.status(403).json({ error: 'Error de autenticación' });
  }
}

module.exports = { verifyToken };

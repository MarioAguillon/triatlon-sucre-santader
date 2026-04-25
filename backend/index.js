// ============================================================
// index.js — Servidor principal Express (Hardened)
// Triatlón Sucre Sin Límites 2.0
// ============================================================
require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp       = require('hpp');
const morgan    = require('morgan');

const participantsRouter = require('./src/routes/participants');
const sponsorsRouter     = require('./src/routes/sponsors');
const authRouter         = require('./src/routes/auth');

const app  = express();
// ── Confianza en Proxy (Obligatorio para Render) ────────────
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// ── Seguridad: Cabeceras HTTP ───────────────────────────────
// helmet configura automáticamente: X-Content-Type-Options,
// X-Frame-Options, Strict-Transport-Security, etc.
app.use(helmet({
  contentSecurityPolicy: false,  // Desactivado para permitir CDNs del frontend
  crossOriginEmbedderPolicy: false,
}));

// Ocultar la tecnología del servidor
app.disable('x-powered-by');

// ── Seguridad: Rate Limiting Global ─────────────────────────
// Máximo 100 peticiones por IP cada 15 minutos
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intenta de nuevo en 15 minutos.' },
});
app.use('/api/', globalLimiter);

// ── Seguridad: Rate Limiting estricto para Login ────────────
// Máximo 5 intentos de login por IP cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos de inicio de sesión. Intenta en 15 minutos.' },
});

// ── Seguridad: Rate Limiting para registro público ──────────
// Máximo 10 registros por IP cada 30 minutos
const registerLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados registros. Intenta de nuevo más tarde.' },
});

// ── Seguridad: HPP (HTTP Parameter Pollution) ───────────────
app.use(hpp());

// ── Logging ─────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ── CORS ────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:4200')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsers (con límite de tamaño) ─────────────────────
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: true, limit: '256kb' }));

// ── Rutas API ───────────────────────────────────────────────
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth',         authRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/sponsors',     sponsorsRouter);

// Ruta para reservas de camisetas con limitador global (100 peticiones / 15 min es suficiente)
const jerseysRouter = require('./src/routes/jerseys');
app.use('/api/jerseys',      jerseysRouter);

// Aplicar rate limit estricto solo al POST de registro
app.use('/api/participants', (req, _res, next) => {
  if (req.method === 'POST' && req.path === '/') {
    return registerLimiter(req, _res, next);
  }
  next();
});

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:  'OK',
    event:   'Triatlón Sucre Sin Límites 2.0',
    fecha:   '18 de julio de 2026',
    message: '¡El servidor está en línea!',
  });
});

// ── 404 handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ── Error handler global ────────────────────────────────────
// No exponer detalles del error en producción
app.use((err, _req, res, _next) => {
  console.error('Error no manejado:', err);
  const message = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : err.message || 'Error interno del servidor';
  res.status(500).json({ error: message });
});

// ── Auto-Healing y Conexión a Base de Datos ─────────────────
const runAutoHeal = require('./src/autoheal');

runAutoHeal().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🏊‍♂️🚴‍♂️🏃‍♂️ Triatlón Sucre Sin Límites 2.0`);
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🛡️  Seguridad: helmet + rate-limit + hpp activos`);
    console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
  });
});

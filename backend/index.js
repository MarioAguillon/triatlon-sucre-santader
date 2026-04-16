// ============================================================
// index.js — Servidor principal Express
// Triatlón Sucre Sin Límites 2.0
// ============================================================
require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const participantsRouter = require('./src/routes/participants');
const sponsorsRouter     = require('./src/routes/sponsors');
const authRouter         = require('./src/routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

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
}));

// ── Body parsers ────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Rutas API ───────────────────────────────────────────────
app.use('/api/auth',         authRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/sponsors',     sponsorsRouter);

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

// ── Error handler ───────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ── Base de datos (deshabilitada temporalmente) ─────────────
// Modo actual: almacenamiento en memoria
// require('./src/db');

app.listen(PORT, () => {
  console.log(`\n🏊‍♂️🚴‍♂️🏃‍♂️ Triatlón Sucre Sin Límites 2.0`);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
});

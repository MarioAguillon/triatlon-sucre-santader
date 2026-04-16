// ============================================================
// routes/sponsors.js — Patrocinadores (modo temporal sin BD)
// ============================================================
const router = require('express').Router();

// ── Almacenamiento temporal en memoria ──────────────────────
let sponsors = [
  { id: 1, nombre: 'Alcaldía de Sucre', tipo: 'alcaldia', logo_url: null, sitio_web: null, activo: true },
  { id: 2, nombre: 'Gobernación de Santander', tipo: 'empresa', logo_url: null, sitio_web: null, activo: true },
];
let nextSponsorId = 3;

// GET /api/sponsors — Listar activos (público)
router.get('/', (_req, res) => {
  const activos = sponsors
    .filter(s => s.activo)
    .sort((a, b) => a.tipo.localeCompare(b.tipo) || a.nombre.localeCompare(b.nombre));
  res.json(activos);
});

// POST /api/sponsors — Crear patrocinador [ADMIN]
router.post('/', (req, res) => {
  const { nombre, tipo, logo_url, sitio_web } = req.body;

  if (!nombre || !tipo) {
    return res.status(400).json({ error: 'Nombre y tipo son requeridos' });
  }

  const tipos = ['alcaldia', 'empresa', 'persona'];
  if (!tipos.includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  const sponsor = {
    id: nextSponsorId++,
    nombre: nombre.trim(),
    tipo,
    logo_url: logo_url || null,
    sitio_web: sitio_web || null,
    activo: true,
  };
  sponsors.push(sponsor);

  res.status(201).json({ id: sponsor.id, message: 'Patrocinador agregado correctamente' });
});

// DELETE /api/sponsors/:id [ADMIN]
router.delete('/:id', (req, res) => {
  const idx = sponsors.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Patrocinador no encontrado' });
  }
  sponsors[idx].activo = false;
  res.json({ message: 'Patrocinador desactivado' });
});

module.exports = router;

// ============================================================
// routes/participants.js — CRUD Participantes (almacenamiento en memoria)
// ============================================================
const router = require('express').Router();

// ── Almacenamiento temporal en memoria ──────────────────────
let participants = [
  { id: 1, nombre: 'Yesenia Fernanda Rueda Fandiño', edad: 30, ciudad: 'Pendiente', telefono: '3173783323', correo: 'yesenia@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 2, nombre: 'María Fernanda Camargo Ariza', edad: 30, ciudad: 'Pendiente', telefono: '3227263345', correo: 'mariaf@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 3, nombre: 'Angie Daniela Camargo Ariza', edad: 30, ciudad: 'Pendiente', telefono: '3503364464', correo: 'angied@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 4, nombre: 'Deisy Yohana Medina Quitian', edad: 30, ciudad: 'Pendiente', telefono: '3209927574', correo: 'deisy@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 5, nombre: 'Cristian Quiroga Marin', edad: 30, ciudad: 'Pendiente', telefono: '3214521497', correo: 'cristian@example.com', disciplina: 'running', categoria: 'elite', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 6, nombre: 'EDGAR ARMANDO MARIN ARDILA', edad: 30, ciudad: 'Pendiente', telefono: '3102198939', correo: 'edgar@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 7, nombre: 'JULIAN DAVID MONCADA VARGAS', edad: 30, ciudad: 'Pendiente', telefono: '3134733817', correo: 'julian@example.com', disciplina: 'ciclismo', categoria: 'recreativa', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 8, nombre: 'Leidy Ruiz', edad: 30, ciudad: 'Pendiente', telefono: '3219035730', correo: 'leidy@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 9, nombre: 'Taylor Alirio Garcia Espinosa', edad: 30, ciudad: 'Pendiente', telefono: '3001952365', correo: 'taylor@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 10, nombre: 'Armando Marin Marin', edad: 30, ciudad: 'Pendiente', telefono: '3213047058', correo: 'armando@example.com', disciplina: 'running', categoria: 'elite', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 11, nombre: 'Arley Ariza Marin', edad: 30, ciudad: 'Pendiente', telefono: '3115036263', correo: 'arley@example.com', disciplina: 'running', categoria: 'elite', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 12, nombre: 'Luis Evelio Quiroga Marin', edad: 30, ciudad: 'Pendiente', telefono: '3114880481', correo: 'luis@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 13, nombre: 'Daniel Stiven Quiroga Bareño', edad: 30, ciudad: 'Pendiente', telefono: '3108084230', correo: 'daniel@example.com', disciplina: 'ciclismo', categoria: 'elite', participo_primera_edicion: 'SI', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true },
  { id: 14, nombre: 'Hugo Ariza Mateus', edad: 30, ciudad: 'Pendiente', telefono: '3208089145', correo: 'hugo@example.com', disciplina: 'running', categoria: 'recreativa', participo_primera_edicion: 'NO', precio_aplicado: 30000, fecha_inscripcion: new Date().toISOString(), activo: true }
];
let nextId = 15;

// ── Categorías válidas por disciplina ───────────────────────
const CATEGORIAS_VALIDAS = {
  running:  ['elite', 'recreativa', 'ninos'],
  ciclismo: ['elite', 'recreativa'],
  natacion: ['unica'],
};

const DISCIPLINAS_VALIDAS = ['running', 'ciclismo', 'natacion'];

// ── Calcular precio según fecha ─────────────────────────────
function calcularPrecio() {
  const FECHA_LIMITE  = new Date('2026-04-30T23:59:59-05:00');
  const PRECIO_TEMP   = 15000;
  const PRECIO_NORMAL = 30000;
  return new Date() <= FECHA_LIMITE ? PRECIO_TEMP : PRECIO_NORMAL;
}

// ────────────────────────────────────────────────────────────
// POST /api/participants — Registrar participante (público)
// ────────────────────────────────────────────────────────────
router.post('/', (req, res) => {
  const { nombre, edad, ciudad, telefono, correo, disciplina, categoria } = req.body;

  // Validaciones básicas
  if (!nombre || !edad || !ciudad || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben completarse' });
  }

  const edadNum = parseInt(edad);
  if (isNaN(edadNum) || edadNum < 5 || edadNum > 100) {
    return res.status(400).json({ error: 'La edad debe estar entre 5 y 100 años' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: 'Correo electrónico inválido' });
  }

  // Validación de disciplina
  if (!disciplina || !DISCIPLINAS_VALIDAS.includes(disciplina)) {
    return res.status(400).json({ error: 'Disciplina inválida. Opciones: running, ciclismo, natacion' });
  }

  // Validación de categoría según disciplina
  const categoriasValidas = CATEGORIAS_VALIDAS[disciplina];
  if (!categoria || !categoriasValidas.includes(categoria)) {
    return res.status(400).json({
      error: `Categoría inválida para ${disciplina}. Opciones: ${categoriasValidas.join(', ')}`
    });
  }

  // Verificar correo duplicado
  const yaExiste = participants.find(
    p => p.correo === correo.trim().toLowerCase() && p.activo
  );
  if (yaExiste) {
    return res.status(409).json({ error: 'Este correo ya está registrado en el evento' });
  }

  const precio = calcularPrecio();
  const participante = {
    id: nextId++,
    nombre: nombre.trim(),
    edad: edadNum,
    ciudad: ciudad.trim(),
    telefono: telefono.trim(),
    correo: correo.trim().toLowerCase(),
    disciplina,
    categoria,
    precio_aplicado: precio,
    fecha_inscripcion: new Date().toISOString(),
    activo: true,
  };

  participants.push(participante);

  res.status(201).json({
    message:     '¡Inscripción exitosa! Nos vemos el 18 de julio de 2026 en Sucre.',
    id:          participante.id,
    precio,
    disciplina,
    categoria,
  });
});

// ────────────────────────────────────────────────────────────
// GET /api/participants/count — Contador público
// ────────────────────────────────────────────────────────────
router.get('/count', (_req, res) => {
  const total = participants.filter(p => p.activo).length;
  res.json({ total });
});

// ────────────────────────────────────────────────────────────
// GET /api/participants — Listar todos [ADMIN]
// ────────────────────────────────────────────────────────────
// Nota: se omite verifyToken temporalmente para modo sin BD
router.get('/', (req, res) => {
  try {
    const page  = Math.max(parseInt(req.query.page  || '1'), 1);
    const limit = Math.min(parseInt(req.query.limit || '50'), 100);
    const search = (req.query.search || '').toLowerCase();

    let filtered = participants.filter(p => p.activo);

    if (search) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(search) ||
        p.ciudad.toLowerCase().includes(search) ||
        p.correo.toLowerCase().includes(search)
      );
    }

    // Ordenar por fecha desc
    filtered.sort((a, b) => new Date(b.fecha_inscripcion) - new Date(a.fecha_inscripcion));

    const total  = filtered.length;
    const offset = (page - 1) * limit;
    const data   = filtered.slice(offset, offset + limit);

    res.json({ data, total, page, limit });
  } catch (err) {
    console.error('Error listando participantes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/participants/:id — Detalle [ADMIN]
// ────────────────────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const p = participants.find(
    p => p.id === parseInt(req.params.id) && p.activo
  );
  if (!p) return res.status(404).json({ error: 'Participante no encontrado' });
  res.json(p);
});

// ────────────────────────────────────────────────────────────
// PUT /api/participants/:id — Editar [ADMIN]
// ────────────────────────────────────────────────────────────
router.put('/:id', (req, res) => {
  const { nombre, edad, ciudad, telefono, correo, disciplina, categoria } = req.body;

  if (!nombre || !edad || !ciudad || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const idx = participants.findIndex(
    p => p.id === parseInt(req.params.id) && p.activo
  );

  if (idx === -1) {
    return res.status(404).json({ error: 'Participante no encontrado' });
  }

  // Verificar correo duplicado (excluyendo el participante actual)
  const duplicado = participants.find(
    p => p.correo === correo.trim().toLowerCase() && p.activo && p.id !== parseInt(req.params.id)
  );
  if (duplicado) {
    return res.status(409).json({ error: 'El correo ya pertenece a otro participante' });
  }

  participants[idx] = {
    ...participants[idx],
    nombre: nombre.trim(),
    edad: parseInt(edad),
    ciudad: ciudad.trim(),
    telefono: telefono.trim(),
    correo: correo.trim().toLowerCase(),
    disciplina: disciplina || participants[idx].disciplina,
    categoria: categoria || participants[idx].categoria,
  };

  res.json({ message: 'Participante actualizado correctamente' });
});

// ────────────────────────────────────────────────────────────
// DELETE /api/participants/:id — Eliminar (soft) [ADMIN]
// ────────────────────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const idx = participants.findIndex(
    p => p.id === parseInt(req.params.id) && p.activo
  );

  if (idx === -1) {
    return res.status(404).json({ error: 'Participante no encontrado' });
  }

  participants[idx].activo = false;
  res.json({ message: 'Participante eliminado correctamente' });
});

module.exports = router;

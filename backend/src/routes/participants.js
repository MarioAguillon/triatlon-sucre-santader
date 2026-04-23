// ============================================================
// routes/participants.js — CRUD Participantes (MySQL + Hardened)
// ============================================================
const router = require('express').Router();
const { body, param, query, validationResult } = require('express-validator');
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');
const { generarPDFConfirmacion } = require('../services/pdfService');
const { enviarCorreoConfirmacion } = require('../services/emailService');

// ── Constantes de validación ────────────────────────────────
const DISCIPLINAS_VALIDAS = ['running', 'ciclismo', 'natacion'];
const CATEGORIAS_VALIDAS = {
  running:  ['elite', 'recreativa', 'ninos'],
  ciclismo: ['elite', 'recreativa', 'ninos'],
  natacion: ['natacion'],
};

// ── Calcular precio según fecha ─────────────────────────────
function calcularPrecio() {
  const FECHA_LIMITE  = new Date('2026-04-30T23:59:59-05:00');
  const PRECIO_TEMP   = 15000;
  const PRECIO_NORMAL = 30000;
  return new Date() <= FECHA_LIMITE ? PRECIO_TEMP : PRECIO_NORMAL;
}

// ── Verificar reCAPTCHA con Google ──────────────────────────
async function verificarCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn('⚠️ RECAPTCHA_SECRET_KEY no configurado, omitiendo verificación');
    return true; // En desarrollo sin clave, permitir
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    });

    const data = await response.json();
    return data.success === true;
  } catch (err) {
    console.error('Error verificando reCAPTCHA:', err);
    return false;
  }
}

// ────────────────────────────────────────────────────────────
// POST /api/participants — Registrar participante (PÚBLICO)
// Protegido con: validación, sanitización, reCAPTCHA
// ────────────────────────────────────────────────────────────
router.post('/',
  // Sanitización y validación con express-validator
  body('nombre')
    .trim()
    .notEmpty().withMessage('Nombre es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('Nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/).withMessage('Nombre contiene caracteres no válidos'),
  body('edad')
    .isInt({ min: 5, max: 100 }).withMessage('Edad debe estar entre 5 y 100 años'),
  body('ciudad')
    .trim()
    .notEmpty().withMessage('Ciudad es requerida')
    .isLength({ max: 100 }).withMessage('Ciudad demasiado larga')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s,.'0-9-]+$/).withMessage('Ciudad contiene caracteres no válidos'),
  body('telefono')
    .trim()
    .notEmpty().withMessage('Teléfono es requerido')
    .isLength({ max: 25 }).withMessage('Teléfono demasiado largo')
    .matches(/^[0-9+\s()-]+$/).withMessage('Teléfono contiene caracteres no válidos'),
  body('correo')
    .trim()
    .notEmpty().withMessage('Correo es requerido')
    .isEmail().withMessage('Correo electrónico inválido')
    .normalizeEmail()
    .isLength({ max: 150 }).withMessage('Correo demasiado largo'),
  body('disciplina')
    .trim()
    .notEmpty().withMessage('Disciplina es requerida')
    .isIn(DISCIPLINAS_VALIDAS).withMessage('Disciplina inválida'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('Categoría es requerida'),
  body('participo_primera_edicion')
    .isIn(['SI', 'NO']).withMessage('Respuesta inválida para participación previa'),
  body('captchaToken')
    .optional()
    .trim(),
  async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const {
      nombre, edad, ciudad, telefono, correo,
      disciplina, categoria, participo_primera_edicion, captchaToken
    } = req.body;

    // Verificar reCAPTCHA
    if (!captchaToken) {
      return res.status(400).json({ error: 'Verificación de reCAPTCHA requerida' });
    }

    const captchaValido = await verificarCaptcha(captchaToken);
    if (!captchaValido) {
      return res.status(400).json({ error: 'Verificación de reCAPTCHA fallida. Intenta de nuevo.' });
    }

    // Validación cruzada: categoría válida para la disciplina seleccionada
    const categoriasValidas = CATEGORIAS_VALIDAS[disciplina];
    if (!categoriasValidas || !categoriasValidas.includes(categoria)) {
      return res.status(400).json({
        error: `Categoría inválida para ${disciplina}. Opciones: ${categoriasValidas?.join(', ') || 'ninguna'}`
      });
    }

    try {
      // Verificar correo duplicado con prepared statement
      const [existing] = await pool.execute(
        'SELECT id FROM participantes WHERE correo = ? AND activo = 1 LIMIT 1',
        [correo.trim().toLowerCase()]
      );

      if (existing.length > 0) {
        return res.status(409).json({ error: 'Este correo ya está registrado en el evento' });
      }

      const precio = calcularPrecio();

      // Insertar con prepared statement (previene SQL Injection)
      const [result] = await pool.execute(
        `INSERT INTO participantes
          (nombre, edad, ciudad, telefono, correo, disciplina, categoria, participo_primera_edicion, precio_aplicado)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nombre.trim(),
          parseInt(edad),
          ciudad.trim(),
          telefono.trim(),
          correo.trim().toLowerCase(),
          disciplina,
          categoria,
          participo_primera_edicion,
          precio,
        ]
      );

      const insertId = result.insertId;

      // ── Generar PDF y Enviar Correo ─────────────────────────
      try {
        const participantData = {
          id: insertId,
          nombre: nombre.trim(),
          correo: correo.trim().toLowerCase(),
          disciplina,
          categoria
        };
        const pdfBuffer = await generarPDFConfirmacion(participantData);
        await enviarCorreoConfirmacion(participantData, pdfBuffer);
      } catch (emailError) {
        console.error('Error al generar PDF o enviar correo de confirmación:', emailError);
        // NOTA: No retornamos error HTTP aquí porque la inscripción en BD ya fue exitosa.
      }

      res.status(201).json({
        message: 'Tu inscripción fue exitosa. Hemos enviado una confirmación a tu correo electrónico.',
        id: insertId,
        precio,
        disciplina,
        categoria,
      });
    } catch (err) {
      console.error('Error registrando participante:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// ────────────────────────────────────────────────────────────
// GET /api/participants/count — Contador público
// ────────────────────────────────────────────────────────────
router.get('/count', async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) as total FROM participantes WHERE activo = 1'
    );
    res.json({ total: rows[0].total });
  } catch (err) {
    console.error('Error contando participantes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/participants — Listar todos [ADMIN - JWT REQUERIDO]
// ────────────────────────────────────────────────────────────
router.get('/', verifyToken, async (req, res) => {
  try {
    const page   = Math.max(parseInt(req.query.page  || '1'), 1);
    const limit  = Math.min(Math.max(parseInt(req.query.limit || '50'), 1), 100);
    const search = (req.query.search || '').trim();
    const offset = (page - 1) * limit;

    let countQuery = 'SELECT COUNT(*) as total FROM participantes WHERE activo = 1';
    let dataQuery  = 'SELECT * FROM participantes WHERE activo = 1';
    const params   = [];

    if (search) {
      const searchFilter = ' AND (nombre LIKE ? OR ciudad LIKE ? OR correo LIKE ?)';
      const searchParam  = `%${search}%`;
      countQuery += searchFilter;
      dataQuery  += searchFilter;
      params.push(searchParam, searchParam, searchParam);
    }

    dataQuery += ' ORDER BY fecha_inscripcion DESC LIMIT ? OFFSET ?';

    // Ejecutar count
    const [countRows] = await pool.execute(countQuery, params);
    const total = countRows[0].total;

    // Ejecutar data (con limit/offset como números)
    const dataParams = [...params, String(limit), String(offset)];
    const [data] = await pool.execute(dataQuery, dataParams);

    res.json({ data, total, page, limit });
  } catch (err) {
    console.error('Error listando participantes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/participants/:id — Detalle [ADMIN - JWT REQUERIDO]
// ────────────────────────────────────────────────────────────
router.get('/:id',
  verifyToken,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'ID de participante inválido' });
    }

    try {
      const [rows] = await pool.execute(
        'SELECT * FROM participantes WHERE id = ? AND activo = 1 LIMIT 1',
        [req.params.id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Participante no encontrado' });
      }

      res.json(rows[0]);
    } catch (err) {
      console.error('Error obteniendo participante:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// ────────────────────────────────────────────────────────────
// PUT /api/participants/:id — Editar [ADMIN - JWT REQUERIDO]
// ────────────────────────────────────────────────────────────
router.put('/:id',
  verifyToken,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  body('nombre').trim().notEmpty().withMessage('Nombre es requerido').isLength({ max: 100 }),
  body('edad').isInt({ min: 5, max: 100 }).withMessage('Edad inválida'),
  body('ciudad').trim().notEmpty().withMessage('Ciudad es requerida').isLength({ max: 100 }),
  body('telefono').trim().notEmpty().withMessage('Teléfono es requerido').isLength({ max: 25 }),
  body('correo').trim().isEmail().withMessage('Correo inválido').normalizeEmail().isLength({ max: 150 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { nombre, edad, ciudad, telefono, correo, disciplina, categoria } = req.body;

    try {
      // Verificar que existe
      const [existing] = await pool.execute(
        'SELECT id FROM participantes WHERE id = ? AND activo = 1 LIMIT 1',
        [req.params.id]
      );
      if (existing.length === 0) {
        return res.status(404).json({ error: 'Participante no encontrado' });
      }

      // Verificar correo duplicado (excluyendo el actual)
      const [duplicado] = await pool.execute(
        'SELECT id FROM participantes WHERE correo = ? AND activo = 1 AND id != ? LIMIT 1',
        [correo.trim().toLowerCase(), req.params.id]
      );
      if (duplicado.length > 0) {
        return res.status(409).json({ error: 'El correo ya pertenece a otro participante' });
      }

      await pool.execute(
        `UPDATE participantes
         SET nombre = ?, edad = ?, ciudad = ?, telefono = ?, correo = ?,
             disciplina = COALESCE(?, disciplina), categoria = COALESCE(?, categoria)
         WHERE id = ? AND activo = 1`,
        [
          nombre.trim(),
          parseInt(edad),
          ciudad.trim(),
          telefono.trim(),
          correo.trim().toLowerCase(),
          disciplina || null,
          categoria || null,
          req.params.id,
        ]
      );

      res.json({ message: 'Participante actualizado correctamente' });
    } catch (err) {
      console.error('Error actualizando participante:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// ────────────────────────────────────────────────────────────
// DELETE /api/participants/:id — Eliminar soft [ADMIN - JWT]
// ────────────────────────────────────────────────────────────
router.delete('/:id',
  verifyToken,
  param('id').isInt({ min: 1 }).withMessage('ID inválido'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'ID de participante inválido' });
    }

    try {
      const [result] = await pool.execute(
        'UPDATE participantes SET activo = 0 WHERE id = ? AND activo = 1',
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Participante no encontrado' });
      }

      res.json({ message: 'Participante eliminado correctamente' });
    } catch (err) {
      console.error('Error eliminando participante:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

module.exports = router;

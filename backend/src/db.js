// ============================================================
// db.js — Conexión MySQL con pool de conexiones (Hardened)
// Triatlón Sucre Sin Límites 2.0
// ============================================================
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               parseInt(process.env.DB_PORT || '3306'),
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'triatlon_sucre',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
  // Seguridad: timeouts para evitar conexiones colgadas
  connectTimeout:     10000,
  // Seguridad: reconexión automática deshabilitada (el pool maneja esto)
  enableKeepAlive:    true,
  keepAliveInitialDelay: 30000,
});

// Verificar conexión al iniciar (sin forzar cierre del proceso)
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    console.log(`   📦 Base de datos: ${process.env.DB_NAME || 'triatlon_sucre'}`);
    conn.release();
  } catch (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
    console.error('   Verifica que XAMPP/MySQL esté encendido y la BD exista.');
    // No forzar process.exit para permitir reintentos en producción
  }
})();

module.exports = pool;

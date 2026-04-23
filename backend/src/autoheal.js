const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runAutoHeal() {
  console.log('🔄 Iniciando secuencia de Auto-Healing (Sincronización de Base de Datos)...');
  
  try {
    // 1. Probar conexión básica
    const conn = await pool.getConnection();
    console.log('✅ Conectado a TiDB / MySQL exitosamente.');

    // 2. Leer archivo schema.sql
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.warn('⚠️ Archivo schema.sql no encontrado en:', schemaPath);
      conn.release();
      return;
    }

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📝 Ejecutando script de inicialización (schema.sql)...');
    
    // 3. Ejecutar todo el script. db.js tiene multipleStatements: true
    // Usamos query() en lugar de execute() porque execute() no soporta múltiples sentencias tan bien.
    await conn.query(schemaSql);
    
    console.log('✨ Auto-Healing completado. Tablas creadas/verificadas correctamente.');
    
    conn.release();
  } catch (error) {
    console.error('❌ Error crítico durante el Auto-Healing:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   👉 Revisa las credenciales en tu archivo .env o en Render.');
    }
    // No forzamos process.exit() para permitir que la app intente reconectar luego si es necesario
  }
}

module.exports = runAutoHeal;

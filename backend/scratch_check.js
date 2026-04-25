require('dotenv').config({ path: 'c:/Angular Davis/triatlon/backend/.env' });
const mysql = require('mysql2/promise');

async function checkData() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { minVersion: 'TLSv1.2' }
    });

    const [rows] = await connection.execute('SELECT * FROM participantes');
    console.log('--- DATOS EN BASE DE DATOS ---');
    console.log(`Total participantes: ${rows.length}`);
    rows.forEach(r => console.log(`[ID: ${r.id}] ${r.nombre} - ${r.correo} (Activo: ${r.activo})`));
    
    await connection.end();
  } catch (err) {
    console.error('Error conectando a BD:', err);
  }
}

checkData();

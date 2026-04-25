/**
 * DIAGNÓSTICO COMPLETO DEL BACKEND EN PRODUCCIÓN
 * Prueba: Login, Dashboard, Email y PDF
 */

const BACKEND_URL = 'https://triatlon-backend.onrender.com/api';

async function diagnose() {
  console.log('=========================================');
  console.log('🩺 DIAGNÓSTICO DE PRODUCCIÓN');
  console.log('=========================================\n');

  // TEST 1: Health check
  console.log('--- TEST 1: Health Check ---');
  try {
    const r1 = await fetch(`${BACKEND_URL}/health`);
    const d1 = await r1.json();
    console.log('✅ Health:', JSON.stringify(d1));
  } catch (e) {
    console.log('❌ Health FALLÓ:', e.message);
  }

  // TEST 2: Count
  console.log('\n--- TEST 2: Contador de Participantes ---');
  try {
    const r2 = await fetch(`${BACKEND_URL}/participants/count`);
    const d2 = await r2.json();
    console.log('✅ Count:', JSON.stringify(d2));
  } catch (e) {
    console.log('❌ Count FALLÓ:', e.message);
  }

  // TEST 3: Public participants
  console.log('\n--- TEST 3: Participantes Públicos ---');
  try {
    const r3 = await fetch(`${BACKEND_URL}/participants/public`);
    const d3 = await r3.json();
    console.log('✅ Public:', JSON.stringify(d3).substring(0, 500));
  } catch (e) {
    console.log('❌ Public FALLÓ:', e.message);
  }

  // TEST 4: Login
  console.log('\n--- TEST 4: Login Admin ---');
  let token = null;
  try {
    const r4 = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: 'admin', password: 'CIELITo12909' })
    });
    const d4 = await r4.json();
    console.log('Status:', r4.status);
    if (d4.token) {
      token = d4.token;
      console.log('✅ Login EXITOSO. Token recibido:', token.substring(0, 30) + '...');
      console.log('   Admin:', JSON.stringify(d4.admin));
    } else {
      console.log('❌ Login FALLÓ:', JSON.stringify(d4));
    }
  } catch (e) {
    console.log('❌ Login ERROR:', e.message);
  }

  // TEST 5: Dashboard (GET participants con JWT)
  if (token) {
    console.log('\n--- TEST 5: Dashboard (GET /participants con JWT) ---');
    try {
      const r5 = await fetch(`${BACKEND_URL}/participants?page=1&limit=20&search=`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const d5 = await r5.json();
      console.log('Status:', r5.status);
      if (d5.data) {
        console.log('✅ Dashboard FUNCIONA. Total:', d5.total, '- Registros:', d5.data.length);
        d5.data.forEach(p => console.log(`   [ID:${p.id}] ${p.nombre} - ${p.correo}`));
      } else {
        console.log('❌ Dashboard FALLÓ:', JSON.stringify(d5));
      }
    } catch (e) {
      console.log('❌ Dashboard ERROR:', e.message);
    }
  } else {
    console.log('\n⚠️ No se pudo probar Dashboard porque el login falló.');
  }

  console.log('\n=========================================');
  console.log('🩺 DIAGNÓSTICO COMPLETO');
  console.log('=========================================');
}

diagnose();

/**
 * 🚀 DISPARO MASIVO DE CORREOS
 * Se conecta a Render, hace login como admin, y llama al endpoint
 * que reenvía correos con PDF a TODOS los participantes activos.
 */
const BACKEND = 'https://triatlon-backend.onrender.com/api';

async function disparar() {
  console.log('=========================================');
  console.log('📬 ENVIANDO CORREOS A TODOS LOS ATLETAS');
  console.log('=========================================\n');

  // Paso 1: Login
  console.log('🔑 Iniciando sesión como admin...');
  const loginR = await fetch(`${BACKEND}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: 'admin', password: 'CIELITo12909' })
  });
  const loginD = await loginR.json();

  if (!loginD.token) {
    console.log('❌ Login falló:', loginD.error);
    return;
  }
  console.log('✅ Login exitoso.\n');

  // Paso 2: Disparar envío masivo
  console.log('📨 Enviando correos... (esto puede tomar unos segundos por cada participante)\n');
  const r = await fetch(`${BACKEND}/participants/resend-all-emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginD.token}`
    }
  });

  const data = await r.json();
  console.log('=========================================');
  console.log('📊 RESULTADO:', data.message);
  console.log('=========================================\n');

  if (data.detalles) {
    data.detalles.forEach(d => {
      console.log(`   ${d.estado} — ${d.nombre} (${d.correo})`);
    });
  }

  console.log('\n🏁 ¡Proceso finalizado!');
}

disparar().catch(err => console.error('Error fatal:', err.message));

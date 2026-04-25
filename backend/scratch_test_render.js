/**
 * Test de envío de email a través de Render (producción)
 * Hace un POST a /api/participants para registrar un participante de prueba
 * y verificar si el correo sale
 */
const BACKEND = 'https://triatlon-backend.onrender.com/api';

async function testRegistration() {
  console.log('🩺 Probando registro + correo en PRODUCCIÓN...\n');

  try {
    const r = await fetch(`${BACKEND}/participants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Test Correo Prueba',
        edad: 30,
        ciudad: 'Sucre',
        telefono: '3001234567',
        correo: 'triatlonsucresantander@gmail.com',
        disciplina: 'running',
        categoria: 'recreativa',
        participo_primera_edicion: 'NO',
        captchaToken: 'test-token'
      })
    });

    const data = await r.json();
    console.log('Status:', r.status);
    console.log('Respuesta:', JSON.stringify(data, null, 2));

    if (r.status === 201) {
      console.log('\n✅ Registro exitoso. Verifica tu bandeja de entrada en triatlonsucresantander@gmail.com');
      console.log('   Si NO llega el correo, el problema es SMTP en Render.');

      // Borrar el participante de prueba
      console.log('\n🗑️ Eliminando participante de prueba...');
      // Login first
      const loginR = await fetch(`${BACKEND}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: 'admin', password: 'CIELITo12909' })
      });
      const loginD = await loginR.json();

      if (loginD.token) {
        const delR = await fetch(`${BACKEND}/participants/${data.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${loginD.token}` }
        });
        const delD = await delR.json();
        console.log('   Resultado:', delD.message || JSON.stringify(delD));
      }
    } else {
      console.log('\n⚠️ Registro falló:', data.error);
    }
  } catch (e) {
    console.log('❌ ERROR:', e.message);
  }
}

testRegistration();

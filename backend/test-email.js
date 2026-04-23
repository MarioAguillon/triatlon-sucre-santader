require('dotenv').config();
const { generarPDFConfirmacion } = require('./src/services/pdfService');
const { enviarCorreoConfirmacion } = require('./src/services/emailService');

(async () => {
  try {
    console.log('Probando envío de correo...');
    console.log('Usuario SMTP:', process.env.SMTP_USER);
    console.log('Password configurado:', process.env.SMTP_PASS ? 'SÍ' : 'NO');
    
    const data = {
      id: 9999,
      nombre: 'Usuario de Prueba',
      correo: 'triatlonsucresantander@gmail.com', // enviarse a sí mismo para probar
      disciplina: 'running',
      categoria: 'elite'
    };
    
    const pdf = await generarPDFConfirmacion(data);
    console.log('PDF generado. Enviando correo...');
    await enviarCorreoConfirmacion(data, pdf);
    console.log('¡Correo enviado con éxito!');
  } catch (err) {
    console.error('Error detallado:', err);
  }
})();

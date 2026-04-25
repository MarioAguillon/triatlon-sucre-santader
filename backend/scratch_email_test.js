/**
 * 🩺 DIAGNÓSTICO DE EMAIL Y PDF
 * Prueba paso a paso la generación de PDF y envío de correo
 */
require('dotenv').config();
const { generarPDFConfirmacion } = require('./src/services/pdfService');
const { enviarCorreoConfirmacion } = require('./src/services/emailService');

async function testEmailPDF() {
  const testData = {
    id: 9999,
    nombre: 'PARTICIPANTE DE PRUEBA',
    correo: 'triatlonsucresantander@gmail.com', // Se envía a ti mismo
    disciplina: 'running',
    categoria: 'recreativa'
  };

  console.log('=========================================');
  console.log('🩺 DIAGNÓSTICO DE EMAIL Y PDF');
  console.log('=========================================\n');

  // Verificar variables SMTP
  console.log('--- PASO 1: Verificar variables SMTP ---');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || '❌ NO DEFINIDO');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '❌ NO DEFINIDO');
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE || '❌ NO DEFINIDO');
  console.log('SMTP_USER:', process.env.SMTP_USER || '❌ NO DEFINIDO');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ DEFINIDO (oculto)' : '❌ NO DEFINIDO');

  // Generar PDF
  console.log('\n--- PASO 2: Generar PDF ---');
  let pdfBuffer;
  try {
    pdfBuffer = await generarPDFConfirmacion(testData);
    console.log(`✅ PDF generado exitosamente. Tamaño: ${pdfBuffer.length} bytes`);
  } catch (err) {
    console.log('❌ ERROR generando PDF:', err.message);
    console.log('   Stack:', err.stack);
    return;
  }

  // Enviar correo
  console.log('\n--- PASO 3: Enviar correo ---');
  try {
    const info = await enviarCorreoConfirmacion(testData, pdfBuffer);
    console.log('✅ CORREO ENVIADO EXITOSAMENTE');
    console.log('   MessageID:', info?.messageId);
  } catch (err) {
    console.log('❌ ERROR enviando correo:', err.message);
    console.log('   Código:', err.code);
    console.log('   Comando:', err.command);
    console.log('   Stack:', err.stack);
  }

  console.log('\n=========================================');
  console.log('🩺 DIAGNÓSTICO COMPLETO');
  console.log('=========================================');
}

testEmailPDF();

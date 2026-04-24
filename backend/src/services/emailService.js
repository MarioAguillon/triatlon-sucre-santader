// ============================================================
// services/emailService.js — Envío de correos transaccionales
// ============================================================
const nodemailer = require('nodemailer');

// Configuración del transporte reutilizable
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true, // true para 465, false para 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Genera el cuerpo en HTML del correo con estilos integrados
 */
function generarTemplateHTML(data) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a la Triatlón</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; color: #333333; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #1a6bff; padding: 30px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
        .header p { margin: 10px 0 0; font-size: 14px; opacity: 0.9; letter-spacing: 0.5px; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .content h2 { color: #1a6bff; font-size: 20px; margin-top: 0; }
        .info-box { background-color: #f8fafc; border-left: 4px solid #ff6b00; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
        .info-box p { margin: 5px 0; font-size: 15px; }
        .info-box strong { color: #1a6bff; }
        .footer { background-color: #f8fafc; text-align: center; padding: 20px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee; }
        .btn { display: inline-block; background-color: #ff6b00; color: #ffffff !important; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TRIATLÓN SUCRE</h1>
          <p>SEGUNDA EDICIÓN - SIN LÍMITES 2.0</p>
        </div>
        
        <div class="content">
          <h2>¡Hola, ${data.nombre}!</h2>
          <p>Es un honor confirmarte que tu registro ha sido recibido exitosamente. Prepárate para vivir la experiencia deportiva más emocionante de Sucre, Santander.</p>
          
          <div class="info-box">
            <p><strong>Número de Inscripción:</strong> #${String(data.id).padStart(4, '0')}</p>
            <p><strong>Disciplina:</strong> ${data.disciplina.toUpperCase()}</p>
            <p><strong>Categoría:</strong> ${data.categoria.toUpperCase()}</p>
            <p><strong>Fecha del Evento:</strong> 18 de Julio de 2026</p>
          </div>
          
          <p>Hemos adjuntado a este correo tu comprobante oficial de inscripción en formato PDF. Por favor, descárgalo y guárdalo en un lugar seguro, ya que podría ser requerido el día del evento.</p>
          <p>Sigue preparándote y no olvides mantenerte atento a nuestras comunicaciones oficiales para conocer todos los detalles de rutas, horarios y entrega de kits.</p>
        </div>
        
        <div class="footer">
          <p>Este es un correo automático, por favor no respondas a esta dirección.</p>
          <p>&copy; 2026 Triatlón Sucre Sin Límites 2.0. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Envía el correo de confirmación con el PDF adjunto
 * @param {Object} data - Datos del participante
 * @param {Buffer} pdfBuffer - Buffer del documento PDF generado
 */
async function enviarCorreoConfirmacion(data, pdfBuffer) {
  // Verificar que SMTP_USER esté configurado
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ Credenciales SMTP no configuradas. Simulando envío de correo.');
    return;
  }

  const mailOptions = {
    from: `"Triatlón Sucre" <${process.env.SMTP_USER}>`,
    to: data.correo,
    subject: 'Bienvenido a la Segunda Edición de la Triatlón – Inscripción Confirmada',
    html: generarTemplateHTML(data),
    attachments: [
      {
        filename: `Inscripcion_Triatlon_${String(data.id).padStart(4, '0')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado a ${data.correo} [ID: ${info.messageId}]`);
    return info;
  } catch (error) {
    console.error(`❌ Error enviando correo a ${data.correo}:`, error.message);
    // Lanzar el error o manejarlo silenciosamente dependiendo de las políticas
    // Lo manejaremos silenciosamente aquí para no romper el registro si falla el correo
    throw error;
  }
}

module.exports = {
  enviarCorreoConfirmacion
};

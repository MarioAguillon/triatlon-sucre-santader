// ============================================================
// services/pdfService.js — Generación de PDF Premium
// ============================================================
const PDFDocument = require('pdfkit');

/**
 * Genera un PDF de confirmación de inscripción en memoria.
 * @param {Object} data - Datos del participante.
 * @param {string} data.nombre - Nombre completo
 * @param {number|string} data.id - Número de inscripción
 * @param {string} data.disciplina - Disciplina (running, ciclismo, etc.)
 * @param {string} data.categoria - Categoría elegida
 * @param {string} data.correo - Correo electrónico
 * @returns {Promise<Buffer>} - Promesa que resuelve con el buffer del PDF.
 */
function generarPDFConfirmacion(data) {
  return new Promise((resolve, reject) => {
    try {
      // Crear documento PDF con márgenes
      const doc = new PDFDocument({ margin: 50, size: 'A4' });

      // Array para almacenar los chunks en memoria
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on('error', reject);

      // Colores de la marca Triatlón Sucre
      const colorPrincipal = '#1a6bff'; // Azul
      const colorAcento = '#ff6b00';    // Naranja
      const colorTexto = '#333333';
      const colorGris = '#777777';

      // ── ENCABEZADO ───────────────────────────────────
      // Franja superior azul
      doc.rect(0, 0, doc.page.width, 100).fill(colorPrincipal);

      // Título en la franja
      doc.fillColor('#ffffff')
         .fontSize(28)
         .font('Helvetica-Bold')
         .text('TRIATLÓN SUCRE', 50, 35, { align: 'center', characterSpacing: 2 });
      
      doc.fontSize(12)
         .font('Helvetica')
         .text('SEGUNDA EDICIÓN - SIN LÍMITES 2.0', 50, 65, { align: 'center', characterSpacing: 1 });

      // ── CUERPO ───────────────────────────────────────
      doc.moveDown(4);

      doc.fillColor(colorPrincipal)
         .fontSize(20)
         .font('Helvetica-Bold')
         .text('¡Inscripción Confirmada!', { align: 'center' });

      doc.moveDown(1);

      doc.fillColor(colorTexto)
         .fontSize(12)
         .font('Helvetica')
         .text(
           `Hola ${data.nombre},\n\nGracias por inscribirte en la Segunda Edición de la Triatlón. Tu registro ha sido realizado exitosamente y ya formas parte de esta experiencia deportiva. A continuación, te presentamos los detalles de tu inscripción:`,
           { align: 'justify', lineGap: 5 }
         );

      doc.moveDown(2);

      // ── CAJA DE DETALLES ──────────────────────────────
      const boxTop = doc.y;
      const boxLeft = 50;
      const boxWidth = doc.page.width - 100;
      const boxHeight = 170;

      // Fondo de la caja
      doc.roundedRect(boxLeft, boxTop, boxWidth, boxHeight, 10)
         .fillOpacity(0.05)
         .fill(colorPrincipal);
      
      // Borde de la caja
      doc.roundedRect(boxLeft, boxTop, boxWidth, boxHeight, 10)
         .lineWidth(2)
         .strokeOpacity(0.5)
         .stroke(colorPrincipal);

      doc.fillOpacity(1); // Restaurar opacidad

      // Contenido de la caja
      const detailX = boxLeft + 30;
      let detailY = boxTop + 25;
      const lineSpacing = 25;

      const details = [
        { label: 'Número de Inscripción:', value: `#${String(data.id).padStart(4, '0')}` },
        { label: 'Nombre Completo:', value: data.nombre.toUpperCase() },
        { label: 'Disciplina:', value: data.disciplina.toUpperCase() },
        { label: 'Categoría:', value: data.categoria.toUpperCase() },
        { label: 'Correo:', value: data.correo },
        { label: 'Estado:', value: 'CONFIRMADO', isHighlight: true }
      ];

      details.forEach((item) => {
        doc.fillColor(colorGris)
           .font('Helvetica-Bold')
           .fontSize(11)
           .text(item.label, detailX, detailY);

        // Alinear valores a la derecha de las etiquetas
        if (item.isHighlight) {
          doc.fillColor(colorAcento).font('Helvetica-Bold');
        } else {
          doc.fillColor(colorTexto).font('Helvetica');
        }
        
        doc.text(item.value, detailX + 160, detailY);
        detailY += lineSpacing;
      });

      // ── PIE DE PÁGINA ────────────────────────────────
      doc.moveDown(5);

      doc.fillColor(colorGris)
         .fontSize(10)
         .font('Helvetica')
         .text('Fecha del Evento: 18 de Julio de 2026', { align: 'center' });
      
      doc.text('Ubicación: Sucre, Santander', { align: 'center', lineGap: 15 });

      // Línea separadora
      doc.moveTo(150, doc.y)
         .lineTo(doc.page.width - 150, doc.y)
         .strokeColor('#cccccc')
         .stroke();

      doc.moveDown(1);
      doc.fillColor(colorPrincipal)
         .font('Helvetica-Bold')
         .text('¡Nos vemos en la meta!', { align: 'center' });

      // Finalizar documento
      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  generarPDFConfirmacion
};

const QRCode = require('qrcode');

QRCode.toFile('codigo_qr_triatlon.png', 'https://www.triatlonsucresantander.com/', {
  color: {
    dark: '#07090F',  // Código de color principal de tu branding
    light: '#FFFFFF' // Fondo blanco transparente para flyers
  },
  width: 1200, // Alta resolución para impresión en flyers
  margin: 2
}, function (err) {
  if (err) throw err;
  console.log('✅ ¡Código QR generado exitosamente! Archivo: codigo_qr_triatlon.png');
});

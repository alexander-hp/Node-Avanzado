const fs = require('fs');

// ? le pasamos como parametro la ruta del archivo y despues en que se codifico
// ? lo que tambien podriamos hacer es decirle donde empezar o terminar
const streamLectura = fs.createReadStream('./archivos/mi_archivo.txt', {
  encoding: 'utf8',
});

// ? vemos las propiedades que tiene el stream
streamLectura
  .on('open', () => {
    console.log('Abriendo archivo');
  })
  .on('data', () => {
    console.log('Recibiendo data...');
  })
  .on('close', () => {
    console.log('archivo cerrado');
  })
  .on('error', () => {
    console.log('error en el archivo');
  });

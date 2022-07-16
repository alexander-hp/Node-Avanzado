const fs = require('fs');

const streamLectura = fs.createReadStream('./archivos/mi_archivo.txt');
const streamEscritura = fs.createWriteStream('./archivos/destino.txt');

// ? hacemos que cuando haya leido el archivo ahora lo escriba
streamLectura.pipe(streamEscritura);

streamLectura.on('end', () => {
  console.log('proceso finalizado');
});

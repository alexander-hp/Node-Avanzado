const fs = require('fs');
const { Duplex } = require('stream');

const streamLectura = fs.createReadStream('./archivos/mi_archivo.txt');
const streamEscritura = fs.createWriteStream('./archivos/destinoDuplex.txt');

streamLectura.setEncoding('utf8');

// ? duplex para poder realizar ambos metodos sin que retrase el flujo
const reporte = new Duplex({
  write(data, encode, callback) {
    console.log(data);
    callback();
  },
  read(size) {},
});

// ? pasamos el pipe para que lea y cree el archivo
streamLectura.pipe(reporte).pipe(streamEscritura);

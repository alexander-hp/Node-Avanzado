const fs = require('fs');
const { Transform } = require('stream');

const streamLectura = fs.createReadStream('./archivos/mi_archivo.txt');
const streamEscritura = fs.createWriteStream('./archivos/destinoTransform.txt');

streamLectura.setEncoding('utf8');

const filtro = new Transform({
  writableObjectMode: true,
  transform(data, encoding, callback) {
    // ? toma la data de bloques que nos llega y la pasamos al resultado
    //? final la pasamos con data y la convertimos a cadena y mayusculas
    this.push(data.toString().toUpperCase());
    callback();
  },
  final(callback) {
    callback();
  },
});

// ? leemos el archivo lo pasamos a filtro lo convierte a mayusculas
// ? y despues lo devolvemos
streamLectura.pipe(filtro).pipe(streamEscritura);

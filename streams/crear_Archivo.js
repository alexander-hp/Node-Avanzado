// ? Creara un archivo de 50 MB
const fs = require('fs');

const archivo = fs.createWriteStream('archivo.txt');

for (let i = 0; i <= 1e6; i++) {
  archivo.write('lorem ipsum example of a large text only for practices');
}

archivo.end();

// ?para ejecutar poner en la terminal node ./crear_Archivo.js

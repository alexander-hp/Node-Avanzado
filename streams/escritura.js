const fs = require('fs');

var contenido = '1234567890';
const iteraciones = 15;

for (let i = 0; i < iteraciones; i++) {
  contenido += contenido;
}

// ? creamos el archivo, parametros (ubicacion, contenido, callback)
fs.writeFile('./archivos/mi_archivo2.txt', contenido, () => {
  console.log('escritura dinamica finalizada');
});

// ? ahora lo creamos con stream parametros (ubicacion)
const streamEscritura = fs.createWriteStream('./archivos/mi_archivoStream.txt');

streamEscritura.write(contenido, (res) => {
  console.log('stream finalizado');
});

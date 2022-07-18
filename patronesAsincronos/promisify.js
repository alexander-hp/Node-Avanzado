const fs = require('fs');
const util = require('util');
// TODO un callback es aquello que se llamara cuando terminemos un proceso

// ? si quisieramos escribir un archivo entonces lo hacemos asi
// ? si es que ya tenemos el archivo creado
// ? parametros(archivoDondeSeEscribira, Data, callback)
// fs.writeFile('./archivos/archivo.txt', 'informacion a escribir', () => {
//   console.log('creado');
//   // ! Por ejemplo aqui cuando termino quiero saber si se termino
//   // ! bien o no mi funcion, para ello haremos una promesa
// });

// ? pero si nosotros  tenemos un error y lo queremos acachar con una
// ? promesa entonces tenemos promisify que viene de util

// ? Aqui convertimos el callback de fs.writeFile en una promesa
const writeFilePromesa = util.promisify(fs.writeFile);

writeFilePromesa('.', 'informacion a escribir')
  .then(() => {
    console.log('Proceso finalizado correctamente');
  })
  .catch((err) => {
    console.log('error: ', err);
  });

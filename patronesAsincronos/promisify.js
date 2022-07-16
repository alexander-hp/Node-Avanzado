const fs = require('fs');
// ? un callback es aquello que se llamara cuando terminemos un proceso

// ? si quisieramos escribir un archivo entonces lo hacemos asi
// ? si es que ya tenemos el archivo creado
// ? parametros(archivoDondeSeEscribira, Data, callback)
fs.writeFile('./archivos/archivo.txt', 'informacion a escribir', () => {
  console.log('creado');
});

// ? pero si nosotros  tenemos un error y lo queremos acachar con una
// ? promesa entonces tenemos promisify que es

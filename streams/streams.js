// ? importamos function systems
const fs = require('fs');

// ? checamos cuanto tiempo tarda en leer el archivo 25 veces sincronicamente
console.time('Tiempo de espera');
for (let i = 0; i <= 25; i++) {
  // ? se lee de forma sincrona
  fs.readFileSync('archivo.txt', 'utf8');
}
console.timeEnd('Tiempo de espera');

// ? checamos cuanto tiempo tarda en leer el archivo 25 veces con streams
// console.time('Tiempo de espera con streams');
// for (let i = 0; i <= 25; i++) {
//   // ? se lee de forma sincrona
//   const streamLectura = fs.createReadStream('archivo.txt', {
//     encoding: 'utf8',
//   });
// }
// console.timeEnd('Tiempo de espera con streams');

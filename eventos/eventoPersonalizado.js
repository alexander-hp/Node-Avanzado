const fs = require('fs');
const EventEmitter = require('events');

class Emisor extends EventEmitter {}

// ? instancia de la clase Emisor
const miEmisor = new Emisor();

// * Lo que queremos hacer en esta practica es escribir un archivo
// * al momento de que se termine, que envie una funcion al usuario
// * y al final mostrar la informacion de el archivo

// ? creamos un stream para escribir un archivo
const streamEscritura = fs.createWriteStream(
  '../eventos/archivos/miArchivo.txt'
);

function escribirEnArchivo() {
  var iteraciones = 5;
  for (let i = 0; i < iteraciones; i++) {
    streamEscritura.write(`iteraccion ${i} \n`);
  }
  streamEscritura.write('****FIN*****');
  streamEscritura.end();
}

function notificarPorCorreo() {
  console.log('preparando correo');
  setTimeout(() => {
    // ? emitimos un evento el cual nos dira que se notifico por correo
    miEmisor.emit('correoOk');
  }, 1500);
}

function leerDocumento() {
  fs.readFile('./archivos/miArchivo.txt', (error, document) => {
    console.log(document.toString());
  });
}

// ? cuando el archivo donde se esta escribiendo se cierre entonces
// ? ahora podemos llamarlo para poder leerlo
streamEscritura.on('close', () => {
  notificarPorCorreo();
});

// ? checamos el emisor de eventos que ya tenga
miEmisor.on('correoOk', () => {
  leerDocumento();
});

// ? mandamos a escribir el archivo
escribirEnArchivo();

// ?

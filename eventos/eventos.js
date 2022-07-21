const https = require('https');

// ? hacemos una peticion get a una pagina y cuando nos de los datos
// ? imprimimos datos recibidos
const req = https.get(
  'https://es.wikipedia.org/wiki/Wikipedia:Portada',
  (res) => {
    console.log('datps recibidos');

    let data;
    // ? recibiendo informacion en bloques
    res.on('data', (data) => {
      console.log('recibiendo data: ', data);
    });

    // ? agregamos toda la informacion a una variable
    res.on('data', function (chunk) {
      data += chunk;
    });

    // ? ultima informacion terminada y mostramos la data
    res.on('end', () => {
      console.log('Data completada: ', data);
    });
  }
);

// ? On nos permite asignar codigo que se va a ejecutar en el momento
// ? que se activa un evento, por ejemplo en socket se activa cuando
// ? nuestra conexion se inicializa
req.on('socket', (data) => {
  console.log('inicia llamada http');
});

// ? o cuando se tenga algun error, esto puede pasar cuando la direccion
// ? que se proporciono en el get no existe por ejemplo
req.on('error', (err) => {
  console.log('error encontrado: ', err);
});

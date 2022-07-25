const express = require('express');
const app = express();
const puerto = 3000;

// ? aqui estamos sirviendo una api de tipo get la cual damos
// ? informacion parametros (require, response), lo que requerimos
// ? y larespuesta que vamos a dar cuando accedan a la ruta
app.get('/', (req, resp) => {
  resp.send('Hola Mundo');
});

app.listen(puerto, () => {
  console.log(`Escuchando al puerto ${puerto}`);
});

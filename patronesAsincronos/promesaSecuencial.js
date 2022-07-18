function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

function datosDeUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

login()
  .then(() => {
    // ? una vez que termino de hacer la funcion imprime
    console.log('Sesion iniciada correctamente');
    // ? y ahora llama a
    return datosDeUsuario();
  })
  .then(() => {
    // ?ahora que ya se retorno los datos de usuario imprimimos
    console.log('datos de usuario recibidos');
  })
  .catch((err) => {
    // ? cachamos los errores que pueda tener
    console.log(`Error: `, err);
  });

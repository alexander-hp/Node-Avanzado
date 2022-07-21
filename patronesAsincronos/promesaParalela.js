function mensajesPrivados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('Promesa 1');
    }, 1500);
  });
}

function galeriaDeFotos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('Promesa 2');
    }, 1500);
  });
}

function ultimasTransacciones() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('Promesa3');
    }, 2500);
  });
}

// ? Para poder ejecutarlas al mimo tiempo haremos lo sig
// ? promise.all nos dice que ejecutara las funciones que le pases
// ? en un arreglo y los resultados igual te los dara en arreglos
// ? al terminar la ejecucion de todas las funciones
Promise.all([
  mensajesPrivados(),
  galeriaDeFotos(),
  ultimasTransacciones(),
]).then((resp) => {
  console.log(`resuelto ${resp}`);
});

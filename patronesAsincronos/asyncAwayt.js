function numeroAleatorio() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 200);
  });
}

async function resultado() {
  console.log('Resultado invocado');
  console.time('Tiempo esperando');
  // ? esperamos a que se termine de ejecutar la promesa
  const aleatorio = await numeroAleatorio();
  console.timeEnd('Tiempo esperando');
  console.log(`Numero aleatorio: ${aleatorio}`);
}

resultado();

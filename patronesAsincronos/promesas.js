const promesasNode = require('fs').promises;

promesasNode
  .copyFile('../streams/archivos/mi_archivo.txt', './archivos/copiaPromesa.txt')
  .then(() => {
    console.log('copia terminada');
  })
  .catch(() => {
    console.log('Hubo un error');
  })
  .finally(() => {
    // ? aqui no afectara nuestro proceso de copia
    console.log('proceso terminado, tenga o no tenga error');
  });

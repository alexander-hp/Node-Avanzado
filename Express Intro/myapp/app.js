var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

// * Enrutadores
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ejemploRouter = require('./routes/ejemplo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ? declaramos la ruta como estatica  y se llama files
app.use(express.static('files'));

// * peticion para servir un archivo  ":nombre_usuario" es una variable
app.get('/abrirArchivo/:nombre_usuario', (req, res) => {
  // ? vamos a escribir el archivo en files
  const streamEscritura = fs.createWriteStream(`${__dirname}/files/text2.txt`);
  // ? escribimos el archivo
  streamEscritura.write(
    `Estimado ${req.params.nombre_usuario}:
    Aqui esta su documento solicitado`,
    // ? en el callback devolveremos el archivo
    () => {
      res.sendFile(`${__dirname}/files/text2.txt`);
    }
  );
});

// * Peticion para descargar un archivo
app.get('/descargar/:nombre_usuario', (req, res) => {
  // ? ya debemos de tener el archivo
  // ? ponemos la ruta del archivo a servir
  res.download(`${__dirname}/files/text2.txt`, (error) => {
    if (error) {
      console.error('ERROR', error);
      res.status(404).render('error');
    } else {
      console.log('Descarga ok');
    }
  });
});

// * RUTAS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ejemplo', ejemploRouter);

// ?Redireccionamos a un luga si es que care en una ruta que cambiamos
app.use((req, res, next) => {
  // ? llamamos a la url en la que esta
  var currentUrl = req.originalUrl;
  if (currentUrl === '/antiguo-documento') {
    // ? codigo 301: cambio de direccion permanente
    return res.redirect(301, 'https://www.google.com/');
  }
  return next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

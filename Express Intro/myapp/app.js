var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util');

const fileInfo = promisify(stat);

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

// * peticion para servir un video con mucho carga de banda
app.use('/video-static', (req, res, next) => {
  const fileName = __dirname + '/public/video/video.mp4';
  // ? le vamos a decir que es de tipo mp4 para que lo vea en los headers
  res.type('video/mp4');
  res.sendFile(fileName);
});

// * peticion para servir un video con streams
app.use('/video-stream', (req, res, next) => {
  const fileName = __dirname + '/public/video/video.mp4';
  // ? enviamos en headers status 200 y tipo video mp4
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
  });

  createReadStream(fileName).pipe(res);
});

// * peticion para servir un video con streams
app.use('/video-rango', async (req, res, next) => {
  const fileName = __dirname + '/public/video/video.mp4';
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;

  if (range) {
    // ? definimos el rango que tiene el video
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    // ?
    res.writeHead(206, {
      'Content-type': 'video/mp4',
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${size}`,
    });

    createReadStream(fileName, { start, end }).pipe(res);
  } else {
    // ? enviamos en headers status 200 y tipo video mp4
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': size,
    });

    createReadStream(fileName).pipe(res);
  }

  createReadStream(fileName).pipe(res);
});

// * peticion para mandar el render del formulario
app.get('/formulario', (req, res) => {
  res.render('formulario');
});

const upload = require('./middleware/uploadMiddleware');

app.post('/confirmacion', upload.single('photo'), (req, res, next) => {
  // ? asi imprimimos el cuerpo de la informacion que recibimos
  // res.send(req.body);
  // ? mandamos al render y enviamos la informacion
  res.render('confirmacion', { datos: req.body, files: req.file });
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

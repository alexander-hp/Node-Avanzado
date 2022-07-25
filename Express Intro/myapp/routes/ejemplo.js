var express = require('express');
var router = express.Router();

/* GET ejemplo listing. */
// * get: verbo de http
router.get('/', function (req, res, next) {
  // ? vamos a responder con la renderizacion de una vista
  res.render('ejemplo');
});

/* GET ejemplo listing. */
router.get('/interno', function (req, res, next) {
  // ? vamos a responder con una vista
  res.send('documento interno');
});

module.exports = router;

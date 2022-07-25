var express = require('express');
var router = express.Router();

function suma() {
  return 1 + 1;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (suma() === 2) {
    res.send('respond with a resource');
  } else {
    res.status(500);
    res.render('error');
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(201).send({'title':'Express App', 'message': 'You reached the index page'});
});

module.exports = router;

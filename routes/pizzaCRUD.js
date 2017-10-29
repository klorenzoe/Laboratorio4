var express = require('express');
var router = express.Router();

let pizzas = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD' });
});

router.get('/Create', function(req, res, next) {
  res.render('createPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD' });
});

router.post('/Created', function(req, res, next) {
  res.render('mainPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD' });
});

module.exports = router;

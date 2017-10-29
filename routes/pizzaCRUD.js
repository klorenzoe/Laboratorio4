var express = require('express');
var router = express.Router();

let pizzas = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("THIS IS THE JSON TO SEND ----> " + JSON.stringify(pizzas));
  res.render('mainPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD', rows : JSON.stringify(pizzas) });
});

router.get('/Create', function(req, res, next) {
  res.render('createPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD' });
});

router.post('/Created', function(req, res, next)
 {
  pizzas[req.body.pizzaName] = { name : req.body.pizzaName, desc : req.body.pizzaDesc, mix : req.body.mix, mass : req.body.masa, cheese : req.body.queso, pieces : req.body.porciones };
  console.log("this is the name ---> " + req.body.pizzaName);
  console.log("this is the object ---> " + pizzas.length);
  res.render('mainPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD', rows : JSON.stringify(pizzas)});
});

module.exports = router;

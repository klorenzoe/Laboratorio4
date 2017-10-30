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

router.get('/Delete', function(req, res, next) {
  
  if (pizzas[req.query.name] !== undefined){
    delete pizzas[req.query.name];
  }
  console.log("INPUT ----> " + pizzas);
  res.render('messagePizza', { title: 'Pizza CRUD', name: "Pizza CRUD",  message1: 'Se ha eliminado correctamente tu pizza: ', message2 : req.query.name });
});

router.post('/Created', function(req, res, next)
 {
  pizzas[req.body.pizzaName] = { name : req.body.pizzaName, desc : req.body.pizzaDesc, mix : req.body.mix, mass : req.body.masa, cheese : req.body.queso, pieces : req.body.porciones };
  res.render('messagePizza', { title: 'Pizza CRUD', name: 'Pizza CRUD',  message1: 'Se ha agregado correctamente tu pizza:', message2 : req.body.pizzaName});
});

module.exports = router;

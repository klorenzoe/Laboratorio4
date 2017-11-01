var express = require('express');
var router = express.Router();

let pizzas = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD', rows : JSON.stringify(pizzas) });
});

router.get('/Create', function(req, res, next) {
  res.render('createPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD' });
});

router.post('/Create', function(req, res, next)
{
  pizzas[req.body.name] = req.body;
  res.status(201);
  res.statusMessage = "Created";
  res.json({ message: 'Se ha agregado correctamente tu pizza: ' + req.body.name, status : res.statusCode  + " - " + res.statusMessage});
});

router.delete('/Delete', function(req, res, next) {
  if (pizzas[req.body.name] !== undefined){
    delete pizzas[req.body.name];
  }
  res.status(204);
  res.statusMessage = "No Content";
  res.end();
});

router.get('/Search', function(req, res, next)
{
  //recuperamos la variable name, que se envia desde el searchPizza en el unico form
  var pizzaName = req.query.name;
  //creamos una nueva lista de pizzas que encajen con la busqueda
  var subPizzas = {}
  //Se busca en todos los elementos de pizzas
//subPizzas = pizzas.filter(x => x.name.startsWith(pizzaName));
var showMessage = 'Nada fue encontrado';  
for (var pizzaKey in pizzas)
  {
    if(pizzaKey !== undefined){
      if(pizzaKey.startsWith(pizzaName)){
        showMessage ='';
        subPizzas[pizzaKey] = pizzas[pizzaKey]; 
      }
    }
  }
  console.log(subPizzas);
  if(showMessage === ''){
    res.status(200);
    res.statusMessage = "OK";
  }else{
    res.status(204);
    res.statusMessage = "No Content";
    subPizzas = '';
  }
  res.json({ message: showMessage, status : res.statusCode  + " - " + res.statusMessage, results : JSON.stringify(subPizzas) });
});
                                 



router.post('/Updated', function(req, res, next)
{
  pizzas[req.body.pizzaName] = { name : req.body.pizzaName, desc : req.body.pizzaDesc, mix : req.body.mix, mass : req.body.masa, cheese : req.body.queso, pieces : req.body.porciones };
  res.render('messagePizza', { title: 'Pizza CRUD', name: 'Pizza CRUD',  message1: 'Se ha editado correctamente tu pizza:', message2 : req.body.pizzaName});
 
});

router.get('/Update', function(req, res, next) {
  var x = req.query.name // recupera el nombre de la pizza
  // recuperamos la pizza de pizzas
  var pizza = pizzas[x];

  res.render('updatePizza', { title: 'Pizza CRUD', name: 'Pizza CRUD', rows : JSON.stringify(pizza) });
});

module.exports = router;

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
  res.render('messagePizza', { title: 'Pizza CRUD', name: "Pizza CRUD",  message1: 'Se ha eliminado correctamente tu pizza: ', message2 : req.query.name });
});

router.get('/Search', function(req, res, next)
{
  //recuperamos la variable name, que se envia desde el searchPizza en el unico form
  var pizzaName = req.query.name;
  console.log(pizzaName);
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
    // haces tu algoritmo
    // si una busqueda encaja lo guardamos asi
    // subPizzas[pizzaKey] = pizzas[pizzasKey];
  }
 res.render('searchPizza', { title: 'Pizza CRUD', name: 'Pizza CRUD', /*Este guarda el valor que se busco y lo manda al input type='text'*/ word : req.query.name/*en lugar de las comillas debe ir req.query.name*/, message1: showMessage, message2 : '',rows : /*En lugar de retornar pizzas, retornamos subPizzas*/JSON.stringify(subPizzas)});
});
                                 

router.post('/Created', function(req, res, next)
 {
  pizzas[req.body.pizzaName] = { name : req.body.pizzaName, desc : req.body.pizzaDesc, mix : req.body.mix, mass : req.body.masa, cheese : req.body.queso, pieces : req.body.porciones };
  res.render('messagePizza', { title: 'Pizza CRUD', name: 'Pizza CRUD',  message1: 'Se ha agregado correctamente tu pizza:', message2 : req.body.pizzaName});
});

module.exports = router;

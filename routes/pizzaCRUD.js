var express = require('express');
var router = express.Router();

let pizzas = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainPizza', { rows : JSON.stringify(pizzas) });
});

router.get('/Create', function(req, res, next) {
  res.render('createPizza');
});

router.post('/Create', function(req, res, next)
{
  pizzas[req.body.name] = req.body;
  res.status(201);
  res.statusMessage = "Created";
  res.json({ message: 'Se ha agregado correctamente tu pizza: ' + req.body.name,statusCode : res.statusCode, statusMessage : res.statusMessage});
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
    res.json({ message: showMessage, statusCode : res.statusCode, statusMessage : res.statusMessage, results : JSON.stringify(subPizzas) });
  }else{
    /*res.status(404);
    res.statusMessage = "Not Found";*/
    res.json({ message: showMessage, statusCode : 404, statusMessage : 'Not Found', results : JSON.stringify('') });
  }
  
});
                                 

router.put('/Update', function(req, res, next)
{
  console.log(req.body);
  if (pizzas[req.body.name]){
    pizzas[req.body.name] = req.body;
    /*res.status(204);
    res.statusMessage = "No Content";*/
    res.json({ message: 'Se ha actualizado correctamente tu pizza: ' + req.body.name, statusCode : 204, statusMessage : 'No Content'});
  }else{
    res.status(404);
    res.statusMessage = "No Found";
    res.json({ message: 'No se pudo actualizar la pizza: ' + req.body.name, status : res.statusCode  + " - " + res.statusMessage});
  }
  
});

router.get('/Update/:pizzaName', function(req, res, next) {
  var x = req.params.pizzaName // recupera el nombre de la pizza
  // recuperamos la pizza de pizzas
  console.log(x);
  var pizza = pizzas[x];

  if(pizza !== undefined){
    res.status(200);
    res.statusMessage = "OK";
    res.render('updatePizza', { rows : JSON.stringify(pizza) });
  }else{
    res.status(204);
    res.statusMessage = "No Content";
    res.render('mainPizza', { rows : JSON.stringify(pizzas) });
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();

let pizzas = {};

/*Database*/
const pizzaModel = require('../models/pizza');

/* GET home page. */
router.get('/', function(req, res, next) {
  pizzaModel.find({}, function(err, pizzasFound){
    if(err){
      res.status(500);
    }else{
      if(!pizzasFound){
        console.log('no dio error, pero no fue encontrada ninguna pizza');
      }else{
        console.log('Se encontró la pizza: ');
        for(var p in pizzasFound){
          console.log(pizzasFound[p]);
            pizzas[pizzasFound[p].name] = {
            "name": pizzasFound[p].name,
            "desc": pizzasFound[p].description,
            "mix": pizzasFound[p].ingredients,
            "mass": pizzasFound[p].massType,
            "cheese":pizzasFound[p].extraCheese,
            "pieces":pizzasFound[p].pieces
        };
        console.log('All the pizzas');
        console.log(pizzas);
        }
      }
      res.status(200);
    }
  });
  res.render('mainPizzaDB', { rows : JSON.stringify(pizzas) });
});

router.get('/Create', function(req, res, next) {
  res.render('createPizzaDB');
});

router.post('/Create', function(req, res, next)
{
  
  var dataPizza = {
    name: req.body.name,
    description: req.body.desc,
    ingredients: req.body.mix,
    massType: req.body.mass,
    extraCheese: req.body.cheese,
    pieces: req.body.pieces
  };
  var pizza = new pizzaModel(dataPizza);
  console.log(pizza);

  pizza.save(function(error, pizzaSaved){
    if(error){
      console.log('hubo un error al guardar');
    }else{
      if(!pizzaSaved){
        console.log('Saber por qué no guarda nada');
      }else{
        console.log('guardó exitosamente');
      }
    }
    res.status(201);
    res.statusMessage = "Created";
  });
  res.json({ message: 'Se ha agregado correctamente tu pizza: ' + req.body.name,statusCode : res.statusCode, statusMessage : res.statusMessage});
});

router.delete('/Delete', function(req, res, next) {
  console.log('ESTO ES LO QUE ENVIO');
  console.log(pizzas[req.body.name]);
  if (pizzas[req.body.name] !== undefined){
    pizzaModel.find({name: req.body.name}, function(err, pizzaFound){
      console.log('key to delete: '+pizzaFound.name);
     pizzaFound.remove(function(err, toDelete){})
   });
  }
  res.status(204);
  res.statusMessage = "No Content";
  res.end();
});

router.get('/Search', function(req, res, next)
{
   //pizzaModel.find({}).where('name').startsWith(pizzaName);
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
  pizzaModel.find({name:req.body.name }, function(err, found){
    if(found){
      pizzaModel.findByIdAndUpdate({_id: found._id}, req.body, function(err, newPizza){
        if(!err){
          res.json({ message: 'Se ha actualizado correctamente tu pizza: ' + req.body.name, statusCode : 204, statusMessage : 'No Content'});
        }else{
          res.status(404);
          res.statusMessage = "No Found";
          res.json({ message: 'No se pudo actualizar la pizza: ' + req.body.name, status : res.statusCode  + " - " + res.statusMessage});
        }
      });
    }
  })
  
});

router.get('/Update/:pizzaName', function(req, res, next) {
  var x = req.params.pizzaName // recupera el nombre de la pizza
  // recuperamos la pizza de pizzas
  var pizzaToUpdate =  pizzaModel.find({name: x}, function(err, found){
    if(found!== undefined){
      res.status(200);
      res.statusMessage = "OK";
      res.render('updatePizzaDB', { rows : JSON.stringify(pizza) });
    }else{
      res.status(204);
      res.statusMessage = "No Content";
      res.render('mainPizzaDB', { rows : JSON.stringify(pizzas) });
    }
  });
});

module.exports = router;

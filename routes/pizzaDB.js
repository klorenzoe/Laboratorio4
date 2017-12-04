var express = require('express');
var router = express.Router();

let pizzas = {};
 
/*Database*/
const pizzaModel = require('../models/pizza');

/* GET home page. */
router.get('/', function (req, res, next) {
  pizzaModel.find({}, function (err, pizzasFound) {
    if (err) {
      res.status(500);
    } else {
      if (!pizzasFound) {
        console.log('no dio error, pero no fue encontrada ninguna pizza');
      } else {
        for (var p in pizzasFound) {
          console.log(pizzasFound[p].name);
          pizzas[pizzasFound[p].name] = {
            "name": pizzasFound[p].name,
            "desc": pizzasFound[p].desc,
            "mix": pizzasFound[p].mix,
            "mass": pizzasFound[p].mass,
            "cheese": pizzasFound[p].cheese,
            "pieces": pizzasFound[p].pieces
          };
        }
      }

    }
    res.status(200);
    res.render('mainPizzaDB', { rows: JSON.stringify(pizzas) });
  });
});

router.get('/Create', function (req, res, next) {
  res.render('createPizzaDB');
});

router.post('/Create', function (req, res, next) {
  var dataPizza = {
    name: req.body.name,
    desc: req.body.desc,
    mix: req.body.mix,
    mass: req.body.mass,
    cheese: req.body.cheese,
    pieces: req.body.pieces
  };
  var pizza = new pizzaModel(dataPizza);
  console.log(pizza);

  pizza.save(function (error, pizzaSaved) {
    if (error) {
      console.log('hubo un error al guardar');
    } else {
      if (!pizzaSaved) {
        console.log('Saber por qué no guarda nada');
      } else {
        console.log('guardó exitosamente');
      }
      res.status(201);
      res.statusMessage = "Created";
      res.json({ message: 'Se ha agregado correctamente tu pizza: ' + req.body.name, statusCode: res.statusCode, statusMessage: res.statusMessage });

    }
  });
});

router.delete('/Delete', function (req, res, next) {
  pizzaModel.find({ name: req.body.name }, function (err, pizzaFound) {

    pizzaModel.findByIdAndRemove({ _id: pizzaFound[0]._id }, function (error) {
      if (!error) {
        console.log('Borrado exitosamente');
        res.status(204);
        res.statusMessage = "No Content";
        fillList();
        res.end();
      }
    })
  });

});

router.get('/Search', function (req, res, next) {
  console.log('ENTRO A SEARCH');
  var showMessage = 'Nada fue encontrado';
  pizzaModel.find({ name: { $regex: '^' + req.query.name } }, function (err, found) {

    var pizzasFound = {};
    if (found) {
      for (var p in found) {
        pizzasFound[found[p].name] = {
          "name": found[p].name,
          "desc": found[p].desc,
          "mix": found[p].mix,
          "mass": found[p].mass,
          "cheese": found[p].cheese,
          "pieces": found[p].pieces
        }
      }
      showMessage = '';
    }
    if (showMessage === '') {
      res.status(200);
      res.statusMessage = "OK";
      res.json({ message: showMessage, statusCode: res.statusCode, statusMessage: res.statusMessage, results: JSON.stringify(pizzasFound) });
    } else {
      /*res.status(404);
      res.statusMessage = "Not Found";*/
      res.json({ message: showMessage, statusCode: 404, statusMessage: 'Not Found', results: JSON.stringify('') });
    }
  });

});


router.put('/Update', function (req, res, next) {
  pizzaModel.find({ name: req.body.name }, function (err, found) {
    if (found) {
      console.log('id del coso a actualizar');
      console.log(found[0].name);
      pizzaModel.findByIdAndUpdate({ _id: found[0]._id }, req.body, function (err, newPizza) {
        if (!err) {
          res.json({ message: 'Se ha actualizado correctamente tu pizza: ' + req.body.name, statusCode: 204, statusMessage: 'No Content' });
        } else {
          res.status(404);
          res.statusMessage = "No Found";
          res.json({ message: 'No se pudo actualizar la pizza: ' + req.body.name, status: res.statusCode + " - " + res.statusMessage });
        }
      });
    }
  })

});

router.get('/Update/:pizzaName', function (req, res, next) {
  var x = req.params.pizzaName // recupera el nombre de la pizza

  // recuperamos la pizza de pizzas
  var pizzaToUpdate = pizzaModel.find({ name: x }, function (err, found) {
    console.log('pizza a editar');
    console.log(found);
    if (found !== undefined) {
      console.log('Algunas propiedades de pizza a editar');
      var pizzafound = {
        "name": found[0].name,
        "desc": found[0].desc,
        "mix": found[0].mix,
        "mass": found[0].mass,
        "cheese": found[0].cheese,
        "pieces": found[0].pieces
      }
      console.log(pizzafound);
      res.status(200);
      res.statusMessage = "OK";
      res.render('updatePizzaDB', { rows: JSON.stringify(pizzafound) });
    } else {
      pizzas = {};
      pizzaModel.find({}, function (err, pizzasFound) {
        for (var p in pizzasFound) {
          pizzas[pizzasFound[p].name] = {
            "name": pizzasFound[p].name,
            "desc": pizzasFound[p].desc,
            "mix": pizzasFound[p].mix,
            "mass": pizzasFound[p].mass,
            "cheese": pizzasFound[p].cheese,
            "pieces": pizzasFound[p].pieces
          };
        }
      });
      res.status(204);
      res.statusMessage = "No Content";
      res.render('mainPizzaDB', { rows: JSON.stringify(pizzas) });
    }
  });
});

function fillList() {
  pizzas = {};
  console.log('ENTRO POR OTRO METODO');
  pizzaModel.find({}, function (err, pizzasFound) {
    for (var p in pizzasFound) {
      pizzas[pizzasFound[p].name] = {
        "name": pizzasFound[p].name,
        "desc": pizzasFound[p].desc,
        "mix": pizzasFound[p].mix,
        "mass": pizzasFound[p].mass,
        "cheese": pizzasFound[p].cheese,
        "pieces": pizzasFound[p].pieces
      };
    }
  });
}
module.exports = router;

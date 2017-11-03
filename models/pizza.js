'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pizzaCRUD', function (err) {
  if (err) console.log('error al conectarse');
  console.log('se conectó la base de datos MongoDB');
});


var schema = mongoose.Schema;

var pizzaSchema = new schema({
  //name: {type: String, required: true }
  name: String,
  desc: String,
  mix: String,
  mass: String,
  cheese: String,
  pieces: Number
});
var pizzaModel = mongoose.model('pizzaModel', pizzaSchema);
module.exports = pizzaModel;
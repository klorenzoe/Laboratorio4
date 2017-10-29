var express = require('express');
var router = express.Router();
var jsonwebtoken = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.render('JWT', { title: 'JSON Web Tokens', name: 'JSON Web Tokens', password : '', content : '', token : '' });
});

router.get('/:content', function(req, res, next)
{
  let values = req.params.content.split("&&");
  value = jsonwebtoken.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: values[1]
  }, values[0]);
  if (values.length >= 2)
  {
    res.render('JWT', { title: 'Main', name: 'JSON Web Tokens', password : values[0], content : values[1], token : value});
    return
  }
  res.render('JWT', { title: 'Main', name: 'JSON Web Token', password : '', content : '', token : '' });
});

module.exports = router;

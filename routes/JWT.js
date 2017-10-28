var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.render('JWT', { title: 'Main', name: 'JSON Web Token', values: '' });
});

router.get('/:content', function(req, res, next)
{
  let content = req.param.content.value.split(";");
  let value = jwt.sign({
                          exp: Math.floor(Date.parse(content[2])),
                          data: content[1]
                        }, content[0]);
  res.render('JWT', { title: 'Main', name: 'JSON Web Token', values : value});

});

module.exports = router;

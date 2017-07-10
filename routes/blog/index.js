var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send({msg: 'success'})
})

router.get('/user', function (req, res, next) {
  const user = req.query.user;
  const pass = req.query.pass;
  if('sma2lbal' === user && '000000' === pass){
    res.send({msg: 'success'})
  } else {
    res.send({error: 'error'})
  }
})

module.exports = router;

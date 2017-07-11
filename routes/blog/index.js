var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send({msg: 'success'})
})

router.get('/user', function (req, res, next) {
  const user = req.query.user;
  const pass = req.query.pass;
  if('sma2lbao' === user && '000000' === pass){
    res.send({msg: '登录成功'})
  } else {
    res.send({error: '登录失败'})
  }
})

router.get('/heads', function (req, res, next) {
  res.send({
    'data': ['主页', '生活记录', '工作记录', '心情随笔']
  })
})

module.exports = router;

var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();
var file = require('fs');
var path =  require('path')
var typeList = ['主页', '生活记录', '工作记录', '心情随笔']

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
    'data': typeList
  })
})

router.post('/article', function (req, res, next) {
  console.log(JSON.parse);
  req.body.comt = JSON.stringify(req.body.comt)
  var articleComt = '{"comt": '+ req.body.comt +'}';
  file.writeFile(path.resolve(__dirname, '../article', typeList[req.body.index] + '/', req.body.title+ '_' + new Date().getTime() +'.json'), articleComt, function (err) {
    if(err) {
      console.log(err);
      res.send({
        error: '保存失败'
      })
    }
    else {
      console.log('save success');
      res.send({
        msg: '保存成功'
      })
    }
  })

})

module.exports = router;

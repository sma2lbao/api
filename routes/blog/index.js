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

router.get('/article', function (req, res, next) {
  // console.log(req.query);
  var targetTime = req.query.time;
  var allFiles = [];
  for (var i = 0; i < typeList.length; i++) {
    var dirPath = path.join(__dirname, '../article/', typeList[i])
    var tempFiles = getFilesByDir(dirPath);
    for (var j = 0; j < tempFiles.length; j++) {
      var pathFile = path.join(dirPath, '/', tempFiles[j]);
      allFiles.push(pathFile)
    }
  }
  var title = "";
  var comt = "";
  for(var z = 0; z < allFiles.length; z++) {
    if(-1 != allFiles[z].indexOf(targetTime)){
      let dataString = file.readFileSync(allFiles[z], 'utf-8');
      let dataJson = JSON.parse(dataString);
      comt = dataJson.comt;
      let dirArry = allFiles[z].split(path.sep);
      title = dirArry[dirArry.length - 1].replace('_' + targetTime, '')
      title = title.replace('.json', '');
    }
  }
  console.log(title, comt);
  if(title && comt) {
    res.send({
      title: title,
      comt: comt
    })
  }
  else {
    res.send({
      error: '未找到指定文件'
    })
  }

})

router.get('/articles', function (req, res, next) {
  var index = req.query.index;
  var allFiles = [];
  if(index === 0) {

  }
  else {
    var dirPath = path.join(__dirname, '../article/', typeList[index]);
    var tempFiles = getFilesByDir(dirPath);
    for (var j = 0; j < tempFiles.length; j++) {
      var pathFile = path.join(dirPath, '/', tempFiles[j]);
      allFiles.push(pathFile)
    }
  }
  var reObj = [];
  for (let i = 0; i < allFiles.length; i++) {
    let comt = '';
    let title = '';
    let time = '';
    let dataString = file.readFileSync(allFiles[i], 'utf-8');
    let dataJson = JSON.parse(dataString);
    comt = dataJson.comt;
    let dirArry = allFiles[i].split(path.sep);
    title = dirArry[dirArry.length - 1].split('_')[0];
    title = title.replace('.json', '');
    time = dirArry[dirArry.length - 1].split('_')[1];
    time = time.replace('.json', '');
    let obj = {
      title: title,
      comt: comt,
      time: time
    }
    reObj.push(obj)
  }
  res.send(reObj)
})

router.get('/homeArticles', function (req, res, next) {
  var allFiles = [];
  for (let i = 0; i < typeList.length; i++) {
    var dirPath = path.join(__dirname, '../article/', typeList[i])
    var tempFiles = getFilesByDir(dirPath);
    for (let j = 0; j < Math.min(tempFiles.length, 2); j++) {
      var pathFile = path.join(dirPath, '/', tempFiles[j]);
      allFiles.push(pathFile);
    }
  }
  // console.log(allFiles);
  var reObj = [];
  for (let i = 0; i < allFiles.length; i++) {
    let comt = '';
    let title = '';
    let time = '';
    let dataString = file.readFileSync(allFiles[i], 'utf-8');
    let dataJson = JSON.parse(dataString);
    comt = dataJson.comt;
    let dirArry = allFiles[i].split(path.sep);
    title = dirArry[dirArry.length - 1].split('_')[0];
    title = title.replace('.json', '');
    time = dirArry[dirArry.length - 1].split('_')[1];
    time = time.replace('.json', '');
    let obj = {
      title: title,
      comt: comt,
      time: time
    }
    reObj.push(obj)
  }
  res.send(reObj)
})

function getFilesByDir(dir) {
  let reFiles = [];
  if(file.existsSync(dir)){
    var dirfiles = file.readdirSync(dir);
    reFiles = dirfiles;
  }
  return reFiles
}
module.exports = router;

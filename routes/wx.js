var express = require('express');
var multiparty = require('multiparty');
var crypto = require('crypto');
var url = require("url");
var router = express.Router();

function sha1(str) {
  var md5sum = crypto.createHash('sha1');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function validate(req, res) {
  console.log('join');
  var query = req.query;
  console.log(req.query + '-' + req.body + '-' + req.params);
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "sma2lbao";
  oriArray.sort();
  var original = oriArray.join('');
  var scyptoString = sha1(original);
  if (signature == scyptoString) {
    res.end(echostr);
    console.log("Confirm and send echo back");
  } else {
    res.end("false");
    console.log("Failed!");
  }
}

var success = {
  code: 1,
  msg: 'success'
};
var error = {
  code: 0,
  msg: 'error'
};
router.get('/', function(req, res, next) {
  validate(req, res);
});

module.exports = router;

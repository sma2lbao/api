var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();

var success = {
  code: 1,
  msg: 'success'
};
var error = {
  code: 0,
  msg: 'error'
};

/* GET api listing. */
router.get('/', function(req, res, next) {
  var data = {
    code: '1',
    msg: 'success'
  };
  res.send(data);
});

router.get('/forlife/signin', function(req, res, next) {
  // console.log(req.body);
  // console.log(req.query);
  // console.log(req.params);
  var data;
  if (req.query.user == 'Sma2lBao' && req.query.password == '000000') {
    res.send(success);
  } else {
    res.send(success);
  }
});

router.post('/forlife/signup', function(req, res, next) {
  if (!req.body.data.username || req.body.data.username == 'Sma2lBao') {
    res.send(error);
  } else {
    res.send(success);
  }
});

router.get('/forlife/tasks', function(req, res, next) {
  var data = {
    total: 4,
    undone: 2,
  };
  res.send(data);
});
router.get('/forlife/task', function(req, res, next) {
  // birthday food chat mouse
  var data = [{
      leftIcon: 'birthday',
      centerTitle: '张三生日',
      centerSubTitle: '礼物',
      rightText: '5pm-7pm'
    },
    {
      leftIcon: 'food',
      centerTitle: '张三生日',
      centerSubTitle: '聚会',
      rightText: '7pm-9pm'
    },
    {
      leftIcon: 'chat',
      centerTitle: '会议',
      centerSubTitle: '讨论',
      rightText: '7pm-9pm'
    },
    {
      leftIcon: 'mouse',
      centerTitle: '工作',
      centerSubTitle: '讨论',
      rightText: '7pm-9pm'
    },
  ];
  res.send(data);
});

router.get('/forlife/date', function(req, res, next) {
  var data = {
    date: new Date().getTime(),
  };
  res.send(data);
});

router.get('/forlife/weather', function(req, res, next) {
  var data = {
    towering: '25°C',
    weatherInfo: 'fine'
  };
  res.send(data);
});

router.get('/forlife/tasklist', function(req, res, next) {
  var data = [{
      // birthday food chat mouse
      leftIcon: 'birthday',
      centerTitle: '李四',
      centerSubTitle: '生日礼物',
      rightText: '7pm-9pm',
      // rightWhiteIcon rightGreenIcon rightPurpleIcon
      rightIcon: 'rightWhiteIcon'
    },
    {
      // birthday food chat mouse
      leftIcon: 'birthday',
      centerTitle: '李四',
      centerSubTitle: '生日礼物',
      rightText: '7pm-9pm',
      // rightWhiteIcon rightGreenIcon rightPurpleIcon
      rightIcon: 'rightGreenIcon'
    },
    {
      // birthday food chat mouse
      leftIcon: 'chat',
      centerTitle: '工作讨论',
      centerSubTitle: '',
      rightText: '3pm-4pm',
      // rightWhiteIcon rightGreenIcon rightPurpleIcon
      rightIcon: 'rightPurpleIcon'
    },
    {
      // birthday food chat mouse
      leftIcon: 'food',
      centerTitle: '聚会',
      centerSubTitle: '',
      rightText: '12am',
      // rightWhiteIcon rightGreenIcon rightPurpleIcon
      rightIcon: 'rightPurpleIcon'
    },
    {
      // birthday food chat mouse
      leftIcon: 'mouse',
      centerTitle: '工作',
      centerSubTitle: '开发',
      rightText: 'All day',
      // rightWhiteIcon rightGreenIcon rightPurpleIcon
      rightIcon: 'rightWhiteIcon'
    },
  ];
  res.send(data);
});

router.post('/upload/video', function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    // console.log(files.originalFilename);
    console.log(files);
  })
  res.send(success);
})

module.exports = router;

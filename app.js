var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var creepers = require('./routes/creepers');
var select = require('./routes/select');
var index = require('./routes/index');
var logger = require('./seriver/logger');
var mail = require("./seriver/mailutil");
var app = express();
var schedule = require('node-schedule');
var config = require("./config/config");
//定时任务
var task = require("./task/qiushi_creepers");
function scheduleCronstyle() {
  schedule.scheduleJob(config.CRON, function () {
    logger.info('scheduleCronstyle:' + new Date());
    logger.info('糗事百科爬虫');
    task.qiushi(function (result, err) {
      if (err) {
        logger.info(err);
      }
      //发送邮件
      mail.sendMail({
        subject: "糗事百科爬虫",
        html: "糗事百科爬虫"+new Date()+result.data,
        to: config.LISTEN_MAIL
      }, function (err) {
        if (err) {
          logger.error('send mail finally error', err);
        }
        logger.info('send mail success')
      });
      logger.info("糗事百科爬虫结束");
    });
  });
}
scheduleCronstyle();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger.info('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/creepers', creepers);
app.use('/select', select);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

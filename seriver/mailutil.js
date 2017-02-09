var mailer        = require('nodemailer');
var config = require("../config/config");
var util          = require('util');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter     = mailer.createTransport(smtpTransport(config.mail_opts));
var async = require('async');
var logger = require('./logger');
// 设置邮件内容
var mailOptions = {
  from:util.format('%s <%s>', "爬虫", config.mail_opts.auth.user), // 发件地址
  to: "tmgan480260@163.com", // 收件列表
  subject: "Hello world", // 标题
  html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
}


module.exports = {

  sendMail :function (data,cb) {
    mailOptions.subject = data.subject;
    mailOptions.html = data.html;
    mailOptions.to = data.to;
    // 重试5次
    async.retry({times: 5}, function (done) {
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          // 写为日志
          logger.error('send mail error mail', err, data);
          return done(err);
        }
         return done();

      });
    }, function (err) {
      cb(err);
      //if (err) {
      //  return logger.error('send mail finally error', err, data);
      //}
      //logger.info('send mail success', data)
    })
  }
}
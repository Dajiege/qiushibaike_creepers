var express = require('express');
var router = express.Router();
var  mail = require("../seriver/mailutil");
var logger = require('../seriver/logger');
router.get('/', function (req, res, next) {
  //mail.sendMail("234",function(err){
  //  if (err) {
  //    logger.error('send mail finally error', err);
  //     return res.render('index');
  //  }
  //  logger.info('send mail success')
  //  res.render('index');
  //});
  res.render('index');
});

module.exports = router;

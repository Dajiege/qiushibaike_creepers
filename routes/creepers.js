var express = require('express');
var router = express.Router();
var superagent = require("superagent");
var cheerio = require("cheerio");
var async = require("async");
var mongoutil = require("../seriver/mongoutil");
var task = require ("../task/qiushi_creepers");

router.get('/', function (req, res, next) {
  var data = [];
  task.qiushi(function(result,err){
    if(err){
      res.json(err);
    }
    data.push(result);
  });
   res.render('index',{title : data});
});

module.exports = router;

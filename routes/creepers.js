var express = require('express');
var router = express.Router();
var superagent = require("superagent");
var cheerio = require("cheerio");
var async = require("async");
var mongoutil = require("../seriver/mongoutil");
var task = require ("../task/qiushi_creepers");

router.get('/', function (req, res, next) {
  task.qiushi(function(result,err){
    if(err){
      res.json(err);
    }
    res.json(result.result);
    //res.render('index',{title : result});
  },next);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoutil = require("../seriver/mongoutil");
router.get('/', function (req, res, next) {
  //res.json(req.originalUrl);
  var data = {};
  if (req.param('sex')) {
    !(req.param('sex') =="man" ) ? data.sex = "-1" : data.sex = {"$ne": "-1"}
  }
  if (req.param('zan')) {
    data.zan = {"$gte": req.param('zan')}
  }
  //显示字段
  var select = {};
  if (req.param('get')) {
    console.log(req.param('get'));
    select._id = 0;
    var words = req.param('get').split(",");
    words.forEach(function(word){
      select[word] = 1
    })
  }else{
    select = {
      "_id": 0,
      "id": 1,
      "content": 1,
      "zan": 1,
      "user_hear": 1,
      "user": 1,
      "sex": 1,
      "age": 1,
      "user_id": 1
    };
  }
  console.log(data);
  console.log(select);

  mongoutil.selectData(data, 'tb3',select, function (result) {
    if(select.user_hear){
      res.render('header',{title : result})
    }
    if(select.content){
      res.render('content',{title : result})
    }
  });
});
module.exports = router;
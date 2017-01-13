
var superagent = require("superagent");
var cheerio = require("cheerio");
var async = require("async");
var mongoutil = require("../seriver/mongoutil");
/**
 * 爬取数据
 * @param url
 * @param callback
 */
var fetchUrl = function (url, callback) {
  console.log("正在请求"+url);
  superagent.get(url)
    .end(function (err, res) {
      if (err) {
        //503重新请求
        if (err || res.statusCode !== 200) {
          fetchUrl(url, callback);
          return;
        }
      }
      var $ = cheerio.load(res.text);
      var itrms = [];
      $('.article.block.untagged.mb15').each(function (idx, element) {
        var $element = $(element);
        itrms.push({
          '_id': $element.find('.contentHerf').attr("href").replace("/article/", ""),
          'content': $element.find(".content").text().replace(/[\r\n]/g, ""),
          'zan': $element.find('.stats-vote .number').text(),
          'user_hear': $element.find('.author.clearfix img').attr("src"),
          'user': $element.find('.author.clearfix h2').text(),
          'sex': $element.find('.articleGender.manIcon').text() || "-1",
          'age': $element.find('.articleGender').text(),
          'user_id':$element.find('.author.clearfix a').attr("href")
        });
      });
      callback(null, itrms);
    })

};





module.exports = {
  qiushi: function ( cb) {
    //res.render('index', { title: 'Express' });
    superagent.get('http://www.qiushibaike.com/hot/')
      .end(function (err, sres) {
        if (err) {
          return next(err);
        }
        var $ = cheerio.load(sres.text);
        var pages = [];
        $('.page-numbers').each(function (idx, element) {
          var $element = $(element);
          pages.push($element.text().replace(/[\r\n]/g, ""));
        });
        console.log("获取到页码" + pages[pages.length - 1]);
        var urls = [];
        for (var i = 1; i <= pages[pages.length - 1]; i++) {
          urls.push("http://www.qiushibaike.com/hot/page/" + i + "/");
        }
        console.log("获取所有url");
        console.log(urls);

        var data=[];
        async.mapSeries(urls, function (url, callback) {
          fetchUrl(url, callback);
        }, function (err, result) {
          //console.log(err);

          //console.log(result);
          result.forEach(function(res){
            data =  data.concat(res);
          });
          async.mapSeries(data, function(l, callback){
           mongoutil.saveData(l,"tb3",function(result){callback(err,result);});
          },function(err,results){
              cb(results,err);
          })

          

        });
      })
  }
};
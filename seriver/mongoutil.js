var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mongotest';

var insertData = function(data,db, callback) {
  //连接到表
  var collection = db.collection('tb2');
  //插入数据
  collection.insert(data, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
};

var selectData = function(where,select,db, callback) {
  //连接到表
  var collection = db.collection('tb2');
  //查询数据
  collection.find(where,select).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}

module.exports = {
  insertData:function(data,cb){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      insertData(data,db, function(result) {
        console.log(result);
        cb(result);
        db.close();
      });
    });
  },
  selectData:function(where,select,cb){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      selectData(where,select,db, function(err,result) {
        cb(err,result);
        db.close();
      });
    });
  }
};

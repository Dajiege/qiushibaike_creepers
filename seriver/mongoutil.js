var MongoClient = require('mongodb').MongoClient;
var config = require("../config/config");
var DB_CONN_STR = config.MONGODB_STR;
var insertData = function(data,conllection,db, callback) {
  //连接到表
  var collection = db.collection(conllection);
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
var saveData = function(data,conllection,db, callback) {
  //连接到表
  var collection = db.collection(conllection);
  //插入数据
  collection.save(data, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
};

var selectData = function(where,conllection,select,db, callback) {
  //连接到表
  var collection = db.collection(conllection);
  //查询数据
  collection.find(where,select).toArray(function(err, result) {
    //console.log(result);
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}

module.exports = {
  insertData:function(data,conllection,cb){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      insertData(data,conllection,db, function(result) {
        if(cb){
          cb(result);
        }
        db.close();
      });
    });
  },
  saveData:function(data,conllection,cb){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      saveData(data,conllection,db, function(result) {
        if(cb){
          cb(result);
        }
        db.close();
      });
    });
  },
  selectData:function(where,conllection,select,cb){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
      console.log("连接成功！");
      selectData(where,conllection,select,db, function(result) {
          cb(result);
        db.close();
      });
    });
  }
};

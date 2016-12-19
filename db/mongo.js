/**
 * Computer user xd
 * Created by 张洋 on 2016/12/18.
 */

var mongdb = require('mongodb');
var dbUrl = 'mongodb://localhost:27017/what2eat';
var MongoClient = mongdb.MongoClient();

//链接数据库并存储db对象
MongoClient.connect(dbUrl,function (err,db) {
    if(err)throw err;
    else {
        console.log('链接数据库成功');
        //todo 这里好坑啊，到底要不要把db对象存储到全局变量中？总不能每次操作都链接一次吧！
        MongoClient.db = db;
    }
});

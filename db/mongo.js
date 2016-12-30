/**
 * Computer user xd
 * Created by 张洋 on 2016/12/18.
 */

var mongdb = require('mongodb');
var Condition = require('../model/Condition');
var SuggestFood = require('../model/SuggestFood');
var dbUrl = 'mongodb://localhost:27017/what2eat';
var MongoClient = mongdb.MongoClient;

//链接数据库并存储db对象
MongoClient.connect(dbUrl,function (err,db) {
    if(err)throw err;
    else {
        console.log('链接数据库成功');
        //todo 这里好坑啊，到底要不要把db对象存储到全局变量中？总不能每次操作都链接一次吧！
        MongoClient.db = db;
        MongoClient.FoodsColl = db.collection('Foods');
        MongoClient.usersColl = db.collection('user');
        MongoClient.FoodTagColl = db.collection('FoodTag');
    }
});

//todo js不会帮你校验传入的是否是Condition类？
//不行啊，不是Condition类的用不了该类的方法啊
//只暴露MongoClient应该调用不了方法，必须通过某种方法调用;
function findSuggest(condition,callback) {
    if(condition == null) throw new Error("传入的查询条件为空");
    //只有通过强制类型转换？
    condition.prototype = Condition.prototype;
    var Filter = {
        "tags.taste":condition.tasteFilter(),
        "tags.people":condition.peopleFilter(),
        // "tags.sex":condition.sexFilter(),
        "tags.time":condition.timeFilter(),
        "HealthCondition":condition.healthConditionFilter()
    };
    var result = [];
    MongoClient.FoodsColl.find(Filter).limit(condition.wantSuggestNum).toArray(function (err,docs) {
        if(err){
            console.log("推荐美食出错");
            throw err;
        }
        else {
            console.log(" 按照查找条件 : "+JSON.stringify(condition)+"  找到结果数量: "+docs.length);
            for(var i=0;i<docs.length;i++){
                result[i] = new SuggestFood(docs[i]);
            }
            //数目不够想要的建议数量就随机生成
            //todo if else 不同情况要分别callback
            if(result.length < condition.wantSuggestNum){
                var moreNum = condition.wantSuggestNum - result.length;
                RandomFood(moreNum,function (RanResult) {
                    result = result.concat(RanResult);
                    callback(result);
                });
            }else {
                callback(result);
            }
        }
    })
}

//通过天气进行推荐
function suggestByWeather(condition,callback) {
    //只有通过强制类型转换？
    condition.prototype = Condition;
    var Filter = {
        "tags.season":condition.season,
        "tags.taste":condition.tasteFilter(),
        "tags.people":condition.peopleFilter(),
        "tags.sex":condition.sexFilter(),
        "tags.time":condition.timeFilter(),
        "HealthCondition":condition.healthConditionFilter()
    };
    var result = [];
    MongoClient.FoodsColl.find(Filter).toArray(function (err,docs) {
        if(err){
            console.log("推荐美食出错");
            throw err;
        }
        else {
            for(var i=0;i<docs.length;i++){
                result[i] = new SuggestFood(docs[i]);
            }
            if(result.length < condition.wantSuggestNum){
                var moreNum = condition.wantSuggestNum - result.length;
                RandomFood(moreNum,function (RanResult) {
                    result = result.concat(RanResult);
                    callback(result);
                });
            }else {
                callback(result);
            }
        }
    })
}

//随机函数，1参数是随机的数量，callback是回调
function RandomFood(RanNum,callback) {
    var result = [];
    var DBCursor = MongoClient.FoodsColl.find();
    DBCursor.count(function (err,foodNum) {
        console.log("当前数据库食物总量 :"+foodNum);
        var ran = Random(0,foodNum-RanNum);
        DBCursor.limit(RanNum).skip(ran);
        DBCursor.toArray(function (err,docs) {
            if(err){
                console.log("推荐美食出错");
                throw err;
            }
            else {
                for(var i=0;i<docs.length;i++){
                    result[i] = new SuggestFood(docs[i]);
                }
            }
            callback(result);
        })
    });
}


//请客函数 目前采用随机的方法
function suggestTreat(condition,callback) {
    RandomFood(1,callback);
}

// 用户登录
function login(user,callback) {
    MongoClient.usersColl.find({name:user.username,passwd:user.password}).toArray(function (err, docs) {
        if(docs.length != 0) callback(true);
        else  callback(false);
    });

}
//用户注册
function signup(user,callback) {
    MongoClient.usersColl.find({name:user.username}).toArray(
        function (err, docs) {
            if(docs.length != 0)callback({success:false});
            else {
                MongoClient.usersColl.insertOne({name:user.username,passwd:user.password});
                callback({success:true});
            }
        }
    );
}

var MongoHelper = {
    MongoClient:MongoClient,
    //如果后面加了括号就是调用的意思
    findSuggest:findSuggest,
    suggestByWeather:suggestByWeather,
    suggestTreat:suggestTreat,
    login:login,
    signup:signup,
};

function Random(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
//将Mongo的client暴露出去
// module.exports = MongoClient;
module.exports = MongoHelper;
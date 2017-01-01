/**
 * Computer user xd
 * Created by 张洋 on 2016/12/18.
 */

var mongdb = require('mongodb');
var Condition = require('../model/Condition');
var SuggestFood = require('../model/SuggestFood');
var dbUrl = 'mongodb://localhost:27017/what2eat';
var MongoClient = mongdb.MongoClient;
var User = require('../model/User');

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


//只暴露MongoClient应该调用不了方法，必须通过某种方法调用;
function findSuggest(condition,callback) {
    if(condition == null) throw new Error("传入的查询条件为空");
    //只有通过强制类型转换？
    condition.prototype = Condition.prototype;
    var Filter = condition.getSuggestFilter();
    var result = [];
    RandomFood(condition.wantSuggestNum,Filter,function (tagsResult) {
        console.log(" 按照查找条件 : "+JSON.stringify(condition)+"  找到结果数量: "+tagsResult.length);
        result = tagsResult;
        //数目不够想要的建议数量就随机生成
        //todo if else 不同情况要分别callback
        if(result.length < condition.wantSuggestNum){
            //去重的过滤器
            var distincFilter = {
                _id:{$nin:[]}
            };
            for(var i=0;i<result.length;i++){
                distincFilter._id.$nin[i] = result[i].id;
            }
            var moreNum = condition.wantSuggestNum - result.length;
            RandomFood(moreNum,distincFilter,function (RanResult) {
                result = result.concat(RanResult);
                callback(result);
            });
        }else {
            callback(result);
        }
    });
    // MongoClient.FoodsColl.find(Filter).limit(condition.wantSuggestNum).toArray()
}

//通过天气进行推荐
function suggestByWeather(condition,callback) {
    //只有通过强制类型转换？
    condition.prototype = Condition;
    var Filter = condition.getWeatherFilter();
    var result = [];
    RandomFood(condition.wantSuggestNum,Filter,function (tagsResult) {
        result = tagsResult;
        //数量不足，就随机
        if(result.length < condition.wantSuggestNum){
            //去重的过滤器
            var distincFilter = {
                _id:{$nin:[]}
            };
            for(var i=0;i<result.length;i++){
                distincFilter._id.$nin[i] = result[i].id;
            }
            var moreNum = condition.wantSuggestNum - result.length;
            RandomFood(moreNum,distincFilter,function (RanResult) {
                result = result.concat(RanResult);
                callback(result);
            });
        }else {
            callback(result);
        }
    });
    // MongoClient.FoodsColl.find(Filter).limit(condition.wantSuggestNum).toArray()
}

//请客函数 目前采用随机的方法
function suggestTreat(condition,callback) {
    var Filter = condition.getTreatFilter();
    RandomFood(1,Filter,callback);
}

//随机函数，1参数是随机的数量， Filter 代表随机时的过滤器 callback是回调
function RandomFood(RanNum,Filter,callback) {
    var result = [];
    var DBCursor = MongoClient.FoodsColl.find(Filter);
    DBCursor.count(function (err,foodNum) {
        console.log("当前数据库食物总量 :"+foodNum);
        if(foodNum > RanNum){
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
        }else {
            //满足Filter的食物数量不足，取出所有满足Filter的
            DBCursor.limit(RanNum);
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
        }
    });
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

//获取用户个人信息
function getUserInfo(user,callback) {
    MongoClient.usersColl.findOne({name:user.username},function (err, result) {
        var userInfo = new User();
        if(result)userInfo = new User(result);
        callback(userInfo);
    });
}
//编辑用户信息
function editUserInfo(user,callback) {
    user.prototype = User;
    MongoClient.usersColl.findOneAndUpdate({name:user.username},user.upPersonalInfo(),function (err, result) {
        if(result.value !==null)callback({editResult:"success"});
        else callback({editResult:"failure"})
    });
}

//上传美食，目前这个接口只有爬虫在使用
function uploadFood(reqParam) {
    //todo 完成格式化数据
    var dbFood = {
        name : reqParam.name,
        "image" : [reqParam.imageURL],
        "tags" : {
            "season" : reqParam.season,
            "people" : reqParam.people,
            "sex" : 0,
            "taste" : reqParam.taste,
            "time" : reqParam.time
        },
        "describe" : reqParam.describe,
        "benefit" : "",
        "HealthCondition" : reqParam.healthCondition,
        "cookMethod" : {
            "exist" : false,
            "material" : [],
            "stepImage" : [
                "#"
            ]
        }

    };
    MongoClient.FoodsColl.updateOne({name:dbFood.name},dbFood,{upsert:true},function (err, result) {
        if(err)console.log("插入数据库出错");
    });
}

var MongoHelper = {
    MongoClient:MongoClient,
    //如果后面加了括号就是调用的意思
    findSuggest:findSuggest,
    suggestByWeather:suggestByWeather,
    suggestTreat:suggestTreat,
    login:login,
    signup:signup,
    getUserInfo:getUserInfo,
    editUserInfo:editUserInfo,
    uploadFood:uploadFood,
};

function Random(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
//将Mongo的client暴露出去
// module.exports = MongoClient;
module.exports = MongoHelper;
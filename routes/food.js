/**
 * Computer user xd
 * Created by 张洋 on 2016/12/18.
 */
var express = require('express');
var Condition = require('../model/Condition');
var router = express.Router();

var MongoHelper = require('../db/mongo');

//获得推荐数据
router.get('/',function (req,res) {
    var condition = new Condition();
    condition.people = 3;
    condition.season = "冬";
    condition.weather = "sunny";
    condition.healthCondition = "精神好";
    condition.sex = "男";
    condition.taste = "辣";
    condition.time = "n";
    //此时result竟然为空 Node默认都是异步？所有的函数调用都是吗？
    MongoHelper.findSuggest(condition,
        function (result) {
            var List = {foodList:result};
            res.render('suggestList', List);
        }
    );
});

//随机推荐
router.get('/random',function (req, res) {
    var condition = new Condition();
    condition.people = 3;
    condition.season = "冬";
    condition.weather = "sunny";
    condition.healthCondition = "精神好";
    condition.sex = "男";
    condition.taste = "辣";
    condition.time = "n";
    MongoHelper.suggestByWeather(condition,
        function (result) {
            var List = {foodList:result};
            res.render('suggestList', List);
        }
    );

});

//请客的url，随机一个，从多人当中
router.get('/treat',function (req, res) {
    var condition = new Condition();
    condition.people = 3;
    condition.season = "冬";
    condition.weather = "sunny";
    condition.healthCondition = "精神好";
    condition.sex = "男";
    condition.taste = "辣";
    condition.time = "n";
    MongoHelper.suggestByWeather(condition,
        function (result) {
            var List = {foodList:result};
            res.render('suggestList', List);
        }
    );
});

module.exports = router;

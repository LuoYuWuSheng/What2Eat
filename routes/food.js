/**
 * Computer user xd
 * Created by 张洋 on 2016/12/18.
 */
var express = require('express');
var Condition = require('../model/Condition');
var MongoHelper = require('../db/mongo');
var router = express.Router();


//获得推荐数据
router.use('/suggest', function (req, res) {

    console.log("/suggest 路径下推荐：condition ：" + JSON.stringify(req.body));

    var test = req.body.condition == undefined;
    var condition;
    if (test) {
        condition = new Condition();
        condition.people = 3;
        condition.season = "冬";
        condition.weather = "sunny";
        condition.healthCondition = "精神好";
        condition.sex = "男";
        condition.taste = "辣";
        condition.time = "n";
    } else {
        condition = new Condition(req.body.condition);
    }
    condition.wantSuggestNum = 3;

    //此时result竟然为空 Node默认都是异步？所有的函数调用都是吗？
    MongoHelper.findSuggest(condition,
        function (result) {
            var List = {foodList: result};
            if(test){
                res.render('suggestList', List);
            }
            else {
                res.json(List);
            }
        }
    );
});

//随机推荐
router.get('/weather', function (req, res) {
    var test = req.body.condition == undefined;

    //todo 这里需要根据天气来搜索，目前还没有实现
    var condition = new Condition();
    condition.season = "冬";
    condition.weather = "sunny";
    condition.people = 3;
    condition.healthCondition = "精神好";
    condition.sex = "男";
    condition.taste = "辣";
    condition.time = "n";
    condition.wantSuggestNum = 2;
    MongoHelper.suggestByWeather(condition,
        function (result) {
            var List = {foodList: result};
            if(test){
                res.render('suggestList', List);
            }else {
                res.json(List);
            }
        }
    );

});

//请客的url，随机一个，从多人当中
router.get('/treat', function (req, res) {
    var test = req.body.condition == undefined;
    var condition = new Condition();
    condition.people = 3;
    condition.season = "冬";
    condition.weather = "sunny";
    condition.healthCondition = "精神好";
    condition.sex = "男";
    condition.taste = "辣";
    condition.time = "n";
    condition.wantSuggestNum = 1;
    MongoHelper.suggestTreat(condition,
        function (result) {
            var List = {foodList: result};
            if(test){
                res.render('suggestList', List);
            } else {
                res.json(List);
            }
        }
    );
});

module.exports = router;

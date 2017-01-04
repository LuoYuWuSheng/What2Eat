var express = require('express');
var router = express.Router();
var MongoHelper = require('../db/mongo');
var User = require('../model/User');

//todo 写cookie解析
/* GET users listing. */
router.use('/login', function (req, res) {
    var user = req.body.user;
    console.log("登录用户名及密码 ：" + JSON.stringify(user));
    MongoHelper.login(user , function (result) {
        if (result) res.json({login: 'success'});
        else res.json({login: 'failure'});
    });
});

router.use('/signup', function (req, res) {
    var user = new User();
    user.username = req.body.user.username;
    user.password = req.body.user.password;
    MongoHelper.signup(user,function (result) {
        return res.json(result);
    })
});
//获取个人信息
router.use('/getInfo',function (req, res) {
    var user = new User();
    user.username = req.body.user.username;
    MongoHelper.getUserInfo(user,function (userInfo) {
        res.json(userInfo);
    })
});
//编辑个人信息
router.use('/editInfo',function (req, res) {
    var user = new User();
    user.username = req.body.user.username;
    user.setPersonalInfo(req.body.user.personalInfo);
    MongoHelper.editUserInfo(user,function (result) {
        res.json(result);
    })
});
//点赞
router.use('/iLoveIt',function (req, res) {
    var loveFromTo = {
        foodId : req.body.condition.foodId,
        userId : req.body.condition.userId
    };
    MongoHelper.iLoveIt(loveFromTo);
//    目前没有回调
    res.json({praise:"success"});
});

module.exports = router;

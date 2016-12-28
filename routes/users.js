var express = require('express');
var router = express.Router();
var MongoHelper = require('../db/mongo');

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
    // todo 注册 MongoHelper.signup();
});

module.exports = router;

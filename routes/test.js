/**
 * Computer user xd
 * Created by 张洋 on 2016/12/21.
 */
var express = require('express');
var router = express.Router();
var SuggestFood = require('../model/SuggestFood');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    var food = new SuggestFood();
    food.name = "食物名称";
    var result = [food];
    res.render('test');
    // res.end(JSON.stringify(result));
});

module.exports = router;

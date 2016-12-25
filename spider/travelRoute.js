/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */
var express = require('express');
var route = express.Router();
var SuggestFood = require('../model/SuggestFood');
var trival = require('./travel');

route.use('/',function (req, res, next) {
    var oneFood = new SuggestFood();
    trival.travel(function () {
        res.render('trival',{food:oneFood})
    });
});

module.exports = route;

/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */
var express = require('express');
var route = express.Router();
var SuggestFood = require('../model/SuggestFood');
var trival = require('./travel');

route.use('/',function (req, res, next) {
    //todo 好坑，传了个undefined，http竟然报莫名的错误
    if(req.body.url !== undefined && req.body.url !== '')trival.nextUrl = req.body.url;
    var oneFood = new SuggestFood();
    trival.requireTravel(function () {
        res.render('trival',{food:oneFood})
    });
});

module.exports = route;

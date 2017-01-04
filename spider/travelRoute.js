/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */
var express = require('express');
var route = express.Router();
var SuggestFood = require('../model/SuggestFood');
var trival = require('./travel');
var MongoHelper = require('../db/mongo');
var fs = require('fs');
var request = require('request');

route.use('/next',function (req, res) {
    if(req.body.url !== undefined && req.body.url !== '')trival.nextUrl = req.body.url;
    console.log(req.query.time);
    var time = req.query.time;
    trival.travel(time,function (oneFood) {
        res.render('travel',{food:oneFood,time:time})
    });
});

route.use('/upload',function (req, res) {
    var imageURL =req.body.imageURL;
    var imageName = imageURL.split('/');
    imageName = imageName[imageName.length-1];
    req.body.imageURL = imageName;
    console.log(JSON.stringify(req.body));
    //保存图片
    request(imageURL).pipe(fs.createWriteStream('public/images/db/'+imageName));
    MongoHelper.uploadFood(req.body);
    res.redirect('next');
});

module.exports = route;

/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */

//爬虫程序，从美食杰爬取数据
var cheerio = require('cheerio');
var http = require('http');
var url = require('url');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var spiderRequest = require('request');
var WebsiteFoodInfo = require('./WebsiteFoodInfo');

var requestHeader = {
    hostname:'www.meishij.net',
    path :'/zuofa/yingtaorou_7.html',
    headers :{
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    }
};

var reqFoodHeader = {
    url:'http://www.meishij.net/zuofa/laziji_61.html',
    headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    }
};

var SuggestFood = require('../model/SuggestFood');

var travel = {
    requireTravel:function requireTravel(callback) {
        var food = new SuggestFood();
        var request = http.request(requestHeader,function (res) {
            var html = '';
            res.setEncoding('utf-8');
            res.on('data',function (data) {
                html+=data;
            });
            res.on('end',function () {
                if(html !== "")console.log("获取页面成功\n");
                else console.log("获取页面失败");
                var $ = cheerio.load(html);
                var divMain = $('div.main_w').children('div.main');
                var a = divMain.children('div.cp_header')
                    .children('div.cp_main_info_w')
                    .children('div.info1')
                    .children('h1.name')
                    .children('a');
                // console.log(divMain.html());
                console.log('爬取到的标题 ： '+entities.decode(a.html()));
                callback(food);
            });
        });
        //todo 这里估计会有问题，无论什么情况都会返回空的food
        // callback(food);
        request.on('error',function (e) {
            console.log('请求失败\n');
            console.log(JSON.stringify(request));
        });

        request.end();
    },
    travel:function travelOne(callback) {
        spiderRequest(reqFoodHeader,function(err,res,body) {
            if(body !== "")console.log("获取页面成功");
            else console.log("获取页面失败");
            resolveHtml(body,function (result) {
                callback(result);
            });
        });
        //todo 这里估计会有问题，无论什么情况都会返回空的food
    },
};

function resolveHtml(html,callback) {

    var imgArray = [];
    var title;
    var taste;
    var people;
    var describe;
    var originalURL;
    var msjURL = requestHeader.url;

    var $ = cheerio.load(html);
    var divMain = $('div.main_w').children('div.main');
    var cp_header = divMain.children('div.cp_header');
    var cp_body = divMain.children('div.cp_body');

    imgArray[0] = cp_header.children('div.cp_headerimg_w').children('img').attr('src');
    var mainInfo = cp_header.children('div.cp_main_info_w');
    title = mainInfo.children('div.info1').children('h1.title').children('a').html();
    title = entities.decode(title);

    people = mainInfo.children('div.info2').children('ul').children('li').eq(2).children('div.processing_w').children('a').html();
    people = entities.decode(people);

    taste = mainInfo.children('div.info2').children('ul').children('li').eq(3).children('a').html();
    taste = entities.decode(taste);

    describe = cp_body.children('div.cp_body_left').children('div.materials').children('p').text();
    describe = entities.decode(describe);

    console.log('爬取到的标题 ： '+title);

    //返回结果
    var result = new WebsiteFoodInfo();
    result.name = title;
    result.describe = describe;
    result.tags.taste = taste;
    result.tags.people = people;
    result.images = imgArray;

    callback(result);
}

module.exports = travel;
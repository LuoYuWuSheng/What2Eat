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

var MSJUrl = 'http://www.meishij.net/zuofa/yingtaorou_7.html';
var pageUrl = 'http://blog.csdn.net/yezhenxu1992/article/details/50820629';
var requestHeader = {
    hostname:'www.meishij.net',
    path :'/zuofa/yingtaorou_7.html',
    headers :{
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    }
};

var reqFoodHeader = {
    url:'http://www.meishij.net/zuofa/yingtaorou_7.html',
    headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    }
};

var SuggestFood = require('../model/SuggestFood');

var travel = {
    nextUrl:pageUrl,
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
                    .children('h1.title')
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
        var food = new SuggestFood();
        spiderRequest(reqFoodHeader,function(err,res,body) {
            if(body !== "")console.log("获取页面成功");
            else console.log("获取页面失败");
            var $ = cheerio.load(body);
            var divMain = $('div.main_w').children('div.main');
            var a = divMain.children('div.cp_header')
                .children('div.cp_main_info_w')
                .children('div.info1')
                .children('h1.title')
                .children('a');
            console.log('爬取到的标题 ： '+entities.decode(a.html()));
            callback(food);
        });
        //todo 这里估计会有问题，无论什么情况都会返回空的food
    },
};

module.exports = travel;
/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */

//爬虫程序，从美食杰爬取数据
var cheerio = require('cheerio');
var http = require('http');
var url = require('url');

var MaxDataNum = 100;
var MSJUrl = 'http://www.meishij.net/zuofa/yingtaorou_7.html';
var pageUrl = 'http://blog.csdn.net/yezhenxu1992/article/details/50820629';
var requestHeader = {
    portocol:'http:',
    method:'post',
    host: 'www.meishij.net',
    path:'/zuofa/yingtaorou_7.html',
    headers:{
        "Upgrade-Insecure-Requests": 1,
        "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        "Accept-Language": 'zh-CN,zh;q=0.8',
    }
};

var SuggestFood = require('../model/SuggestFood');

var travel = {
    nextUrl:pageUrl,
    requireTravel:function requireTravel(callback) {
        // console.log(url.parse(this.nextUrl));
        var food = new SuggestFood();
        var request = http.request(MSJUrl,function (res) {
            var html = '';
            res.setEncoding('utf-8');
            res.on('data',function (data) {
                html+=data;
            });
            res.on('end',function () {
                if(html !== "")console.log("获取页面成功\n"+html);
                else console.log("获取页面失败");
                var $ = cheerio.load(html);
                var divMain = $('div.main_w').children('div.main');
                var a = divMain.children('div.cp_header')
                    .children('div.cp_main_info_w')
                    .children('div.info1')
                    .children('h1.title')
                    .children('a');
                console.log(divMain.html());
                console.log(a.html());
                callback(food);
            });
        });
        //todo 这里估计会有问题，无论什么情况都会返回空的food
        // callback(food);
        request.on('error',function (e) {
            console.log('请求失败\n');
            console.log(Json.stringify(request));
        });

        request.end();
    },
    travel:function travelOne(callback) {
        var food = new SuggestFood();
        http.get(this.nextUrl,function (res) {
            var html = '';
            res.setEncoding('utf-8');
            res.on('data',function (data) {
              html+=data;
            });
            res.on('end',function () {
                if(html !== "")console.log("获取页面成功\n"+html);
                else console.log("获取页面失败");
                  var $ = cheerio.load(html);
                  var divMain = $('div.main_w').children('div.main');
                  var a = divMain.children('div.cp_header')
                  .children('div.cp_main_info_w')
                  .children('div.info1')
                  .children('h1.title')
                  .children('a');
              console.log(divMain.html());
              console.log(a.html());
              callback(food);
            });
        });
        //todo 这里估计会有问题，无论什么情况都会返回空的food
        // callback(food);
    },
    resolveHtml:function resolveHtml(html) {
        console.log("haha");
        console.log(html);
        console.log($('div'));
    }
};

module.exports = travel;
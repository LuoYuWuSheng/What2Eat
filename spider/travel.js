/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */

//爬虫程序，从美食杰爬取数据
var cheerio = require('cheerio');
var http = require('http');
var MaxDataNum = 100;
// var pageUrl = 'http://www.meishij.net/zuofa/heifashimakalong_1.html';
var pageUrl = 'http://www.meishij.net/zuofa/heifashimakalong_1.html';
var requestHeader = {
    GET: '/zuofa/yuerji_9.html HTTP/1.1',
    Host: 'www.meishij.net',
    Connection: 'keep-alive',
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    Referer: 'http://www.meishij.net/zuofa/yuerji_9.html',
    "Accept-Encoding": 'gzip, deflate, sdch',
    "Accept-Language": 'zh-CN,zh;q=0.8',
};

var SuggestFood = require('../model/SuggestFood');

var travel = {
    travel:function travelOne(callback) {
        var food = new SuggestFood();
        http.get(pageUrl,function (res) {
            var html = '';
            res.on('data',function (data) {
              html+=data;
            });
            res.on('end',function () {
                if(html !== "")console.log("获取页面成功");
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
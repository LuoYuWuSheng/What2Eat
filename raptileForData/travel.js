/**
 * Computer user xd
 * Created by 张洋 on 2016/12/23.
 */

//爬虫程序，从美食杰爬取数据
var cheerio = require('cheerio');
var http = require('http');
var MaxDataNum = 100;
var pageUrl = 'http://www.meishij.net/china-food/caixi';
function travel() {
    http.get(pageUrl,function (res) {
        var html = '';
        res.on('data',function (data) {
            html+=data;
        });
        res.on('end',function () {
            console.log("获取页面成功");
            resolveHtml(html);
        });
    });

    // var i = 0;
    // while (i<MaxDataNum){
    //
    // }
}

function resolveHtml(html) {
    console.log("haha");
    console.log(html);
    var $ = cheerio.load(html);
    console.log($('div'));
}

travel();
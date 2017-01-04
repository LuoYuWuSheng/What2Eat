/**
 * Computer user xd
 * Created by 张洋 on 2017/1/2.
 */
var cheerio = require('cheerio');
var request = require('request');

var header = {
    url: 'http://www.meishij.net/zuofa/laziji_61.html',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    }
};

timeUrls = {
    baseURL: 'http://www.meishij.net/list.php?',
    morning: 'lm=365',
    noon: 'lm=366',
    evening: 'lm=367',
    afternoon: 'lm=386',
    night: 'lm=387',

    morningURLs: [],
    noonURLs: [],
    eveningURLs: [],
    afternoonURLs: [],
    nightURLs: [],

    //指示当前访问到哪
    morningIndex: [1, 0],
    noonIndex: [1, 0],
    eveningIndex: [1, 0],
    afternoonIndex: [1, 0],
    nightIndex: [1, 0],

    nextUrl: function (time,callback) {
        var page;
        var index;
        switch (time) {
            case 'morning': {
                page = this.baseURL + this.morning + '&' + 'page=' + this.morningIndex[0];
                index = this.morningIndex[1]++;
                if(index > 17){
                    this.morningIndex[1]=0;
                    this.morningIndex[0]++;
                }
                break;
            }
            case 'noon': {
                page = this.baseURL + this.noon + '&' + 'page=' + this.noonIndex[0];
                index = this.noonIndex[1]++;
                if(index > 17){
                    this.noonIndex[1]=0;
                    this.noonIndex[0]++;
                }
                break;
            }
            case 'evening': {
                page = this.baseURL + this.evening + '&' + 'page=' + this.eveningIndex[0];
                index = this.eveningIndex[1]++;
                if(index > 17){
                    this.eveningIndex[1]=0;
                    this.eveningIndex[0]++;
                }
                break;
            }
            case 'afternoon': {
                page = this.baseURL + this.afternoon + '&' + 'page=' + this.afternoonIndex[0];
                index = this.afternoonIndex[1]++;
                if(index > 17){
                    this.afternoonIndex[1]=0;
                    this.afternoonIndex[0]++;
                }
                break;
            }
            case 'night': {
                page = this.baseURL + this.night + '&' + 'page=' + this.nightIndex[0];
                index = this.nightIndex[1]++;
                if(index > 17){
                    this.nightIndex[1]=0;
                    this.nightIndex[0]++;
                }
                break;
            }
            default : {
                page = this.baseURL + this.morning + '&' + 'page=' + this.morningIndex[0];
                index = this.morningIndex[1]++;
                if(index > 17){
                    this.morningIndex[1]=0;
                    this.morningIndex[0]++;
                }
                break;
            }
        }
        header.url = page;
        request(header, function (err, res, body) {
            if (body !== "") console.log("按时间获取页面成功");
            else console.log("获取页面失败");
            var $ = cheerio.load(body);
            var nexturl =  $('div.main_w').children('div.main').children('div.liststyle1_w').children('div.listtyle1_w').children('div.listtyle1_list')
                .children('div.listtyle1').eq(index).children('a').attr('href');
            callback(nexturl);
        });

    }

};

module.exports = timeUrls;
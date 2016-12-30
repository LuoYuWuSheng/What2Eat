/**
 * Computer user xd
 * Created by 张洋 on 2016/12/20.
 */
//clientCondition是为了实现前端传入条件和这里的做一个适配
function Condition(reqParam) {
    if(reqParam != null){
        this.weather = "";
        this.season = "";
        switch (reqParam.health){
            case 'great':this.healthCondition = "精神好";break;
            case 'cute':this.healthCondition = "萌萌哒";break;
            case 'recover':this.healthCondition = "小病初愈";break;
            case 'meat':this.healthCondition = "想吃肉";break;
            case 'pox':this.healthCondition = "长痘";break;
            case 'hungry':this.healthCondition = "饿了好几天";break;
            default :this.healthCondition = "我不关心";
        }
        //默认人数是1
        this.people = parseInt(reqParam.num);
        this.sex = 0;
        switch (reqParam.flavor){
            case 'acid':this.taste = "酸";break;
            case 'sweet':this.taste = "甜";break;
            case 'hot':this.taste = "辣";break;
            case 'salty':this.taste = "咸";break;
            default :this.taste = "随便";
        }
        switch (reqParam.time){
            case 'morning':this.time = "m";break;
            case 'midday':this.time = "n";break;
            case 'pm':this.time = "a";break;
            case 'evening':this.time = "e";break;
            case 'night':this.time = "e";break;
            default :this.time = "随便";
        }
    }else {
        this.weather = "";
        this.season = "";
        this.healthCondition = "";
        //默认人数是1
        this.people = 1;
        this.sex = "";
        this.taste = "";
        this.time = "";
    }
    //默认是拿到全部数据
    this.wantSuggestNum = 0;
}

Condition.prototype = {
    healthConditionFilter: function () {
        switch (this.healthCondition){
            case "精神好":
            case "萌萌哒":
            case "小病初愈":
            case "想吃肉":
            case "长痘":
            case "饿好几天了":
                return {$in: [this.healthCondition]};
            //    todo 默认精神好
            default :
                return {$in:["精神好"]};
        }
    },
    peopleFilter: function () {
        switch (this.people) {
            case -2:
                return -2;
            case -1:
                return -1;
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            default:
                return {$gt:3};
        }
    },
    sexFilter: function () {
        if (this.sex == "男")
            return {$lt: 1};
        else return {$gt: -1};
    },
    tasteFilter: function () {
        return {$in: [this.taste]};
    },
    timeFilter: function () {
        return {$in: [this.time]};
    },
};

module.exports = Condition;
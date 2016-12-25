/**
 * Computer user xd
 * Created by 张洋 on 2016/12/20.
 */

function Condition() {
    this.weather = "";
    this.season = "";
    this.healthCondition = "";
    //默认人数是1
    this.people = 1;
    this.sex = "";
    this.taste = "";
    this.time = "";
}

Condition.prototype = {
    //是否是单人餐
    single: function () {
        if (this.people == 1)return true;
        else return false;
    },
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
            default:
                return {$gt: 2};
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
    }
};

module.exports = Condition;
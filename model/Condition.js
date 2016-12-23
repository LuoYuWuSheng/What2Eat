/**
 * Computer user xd
 * Created by 张洋 on 2016/12/20.
 */

function Condition() {
    this.weather = "";
    this.season ="";
    //默认人数是1
    this.people = 1;
    this.sex = "";
    this.taste = "";
    this.time = "";
}

Condition.prototype = {
    //是否是单人餐
    single:function () {
        if(this.people == 1)return true;
        else return false;
    },
    peopleFilter:function () {
        switch (this.people){
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
                return {$gt:2};
        }
    },
    sexFilter : function () {
        if(this.sex == "男")
            return {$lt:1};
        else return {$gt:-1};
    },
    tasteFilter: function () {
        return {$in:[this.taste]};
    },
    timeFilter : function () {
        return {$in:[this.time]};
    }
};

module.exports = Condition;
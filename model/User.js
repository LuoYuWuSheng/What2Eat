/**
 * Computer user xd
 * Created by 张洋 on 2017/1/1.
 */
function User(doc) {
    if(doc!= null){
        this.id = doc._id;
        this.username = doc.name;
        this.password = doc.passwd;
        this.personalInfo = {};
        if(doc.personalInfo != undefined){
            this.personalInfo.star = doc.personalInfo.star;
            this.personalInfo.age = doc.personalInfo.age;
            this.personalInfo.favor = doc.personalInfo.favor;
            this.personalInfo.career = doc.personalInfo.career;
        }
    }else {
        this.id = "";
        this.username = "不存在此用户";
        this.password = "";
        this.personalInfo = {};
        this.personalInfo.star = "";
        this.personalInfo.age = "";
        this.personalInfo.favor = "";
        this.personalInfo.career = "";
    }
}

User.prototype = {
    upPersonalInfo(){
        var upDoc = { $set:{}};
        upDoc.$set.personalInfo = this.personalInfo;
        return upDoc;
    }
};

module.exports = User;
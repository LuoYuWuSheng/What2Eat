/**
 * Computer user xd
 * Created by 张洋 on 2017/1/1.
 */
function User(doc) {
    if(doc!= null){
        this.id = doc._id;
        this.username = doc.name;
        this.password = doc.passwd;
        //如果是undefined的话，代表用户还没有编辑过信息。
        this.personalInfo = doc.personalInfo;
    }else {
        this.id = "";
        this.username = "不存在此用户";
        this.password = "";
        this.personalInfo = {
            star : "",
            age : "",
            favor : "",
            career : ""
        };
    }
}

User.prototype = {
    upPersonalInfo(){
        var upDoc = { $set:{}};
        upDoc.$set.personalInfo = this.personalInfo;
        return upDoc;
    },
    //前端传过来的做一个映射 目前没有写
    setPersonalInfo(param){

    }
};

module.exports = User;
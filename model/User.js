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
    setPersonalInfo(perInfoParam){
        switch (perInfoParam.favor){
            case 0:this.personalInfo.favor = "无辣不欢";break;
            case 1:this.personalInfo.favor = "素食主义";break;
            case 2:this.personalInfo.favor = "少糖少盐";break;
            case 3:this.personalInfo.favor = "就爱甜食";break;
            case 4:this.personalInfo.favor = "从不挑食";break;
            default :this.personalInfo.favor = "从不挑食";break;
        }
        switch (perInfoParam.career){
            case 5:this.personalInfo.career = "学生党";break;
            case 6:this.personalInfo.career = "上班族";break;
            case 7:this.personalInfo.career = "自由职业";break;
            default:this.personalInfo.career = "学生党";break;
        }
        this.personalInfo.age = perInfoParam.age;
        this.personalInfo.star = perInfoParam.star;
    }
};

module.exports = User;
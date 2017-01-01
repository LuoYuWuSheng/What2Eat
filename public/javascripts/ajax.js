/**
 * Computer user xd
 * Created by 张洋 on 2016/12/26.
 */

$.ajax({
    type:"post",
    dataType:"html",
    url:'/users/signup',
    contentType: "application/json; charset=utf-8",
    data:JSON.stringify({user:{username:'lx',password:"lx"}}),
    success:function (data) {
        if(data!=""){
            console.log("返回数据 "+JSON.stringify(data));
        }
    }
});
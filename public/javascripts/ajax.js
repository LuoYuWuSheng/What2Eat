/**
 * Computer user xd
 * Created by 张洋 on 2016/12/26.
 */

$.ajax({
    type:"post",
    dataType:"html",
    url:'/test',
    contentType: "application/json; charset=utf-8",
    data:JSON.stringify({condition:{name:'hahah',people:3}}),
    success:function (data) {
        if(data!=""){
            console.log("有数据返回");
        }
    }
});
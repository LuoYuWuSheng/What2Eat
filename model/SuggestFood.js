/**
 * Computer user xd
 * Created by 张洋 on 2016/12/20.
 */
function SuggestFood(doc) {
    if(doc!=null){
        this.id = doc.id;
        this.name = doc.name;
        this.image = doc.image;
        this.describe = doc.describe;
        this.benefit = doc.benefit;
    }else {
        this.id = "123";
        this.name = "火锅";
        this.image = "#";
        this.describe = "";
        this.benefit = "";
    }
}

SuggestFood.prototype = {

};

module.exports = SuggestFood;
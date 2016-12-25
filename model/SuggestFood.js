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
        this.id = "";
        this.name = "";
        this.image = "";
        this.describe = "";
        this.benefit = "";
    }
}

SuggestFood.prototype = {

};

module.exports = SuggestFood;
/**
 * Computer user xd
 * Created by 张洋 on 2016/12/28.
 */
class foodInfo{
    constructor() {
        this.name = "没有拿到";
        this.describe = "没有拿到 100字以内";
        this.images = [];
        this.tags = {};
        this.tags.season = "";
        this.tags.sex = 0;
        this.tags.people = 1;
        this.originalURL = "";
        this.tags.time = [];
        this.tags.taste = [];

    }
}
module.exports = foodInfo;
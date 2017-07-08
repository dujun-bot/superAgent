const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Video=new Schema({
    _id: ObjectId,
    type:String,//类别
    cTime:String,//创建时间
    uTime:String,//修改时间
    operator:String,//操作者
    status:String,//状态
    describe:{
        title:String,//标题
        content:String,//内容
        videoFrom:String,//视频来源
        words:String,//关键词
        introduction:String,//文章见解
        gameName:String,//所属游戏
        videoUrl:String,//视频地址
        videoTime:String,//视频时长
        imgUrl:String //图片地址
    }
});

module.exports = Video;
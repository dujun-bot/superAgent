const videoModel = require('../model/mongoose').videoModel;
const moment = require("moment");
//保存数据的方法
let saveVideo=(titles, imgUrl, videoUrl, videoTime,gameName, count, cFrom, keywords, description)=> {
    let model = {
        type: 'video',
        cTime: moment().format('YYYY-MM-DD'),
        uTime: moment().format('YYYY-MM-DD'),
        operator: '',
        status: 'auditing',
        describe: {
            title: titles,
            imgUrl: imgUrl,
            videoUrl: videoUrl,
            videoFrom: cFrom,
            introduction: description,
            words: keywords,
            gameName: gameName,
            videoTime: videoTime,
            content: ''
        }
    };
    videoModel.collection.insert(model, function (err) {
        if (err) {
            console.log("打印错误日志：" + err);
            return next(err);
        } else {
            console.log(cFrom+' 第 ' + count + ' 条数据保存成功'+new Date().getFullYear() + '-' +
                (new Date().getMonth() + 1) + '-' +
                new Date().getDate() + ' ' +
                new Date().getHours() + ':' +
                new Date().getMinutes());
        }
    });
}

module.exports = saveVideo;
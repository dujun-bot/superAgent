const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const cheerio = require("cheerio");
const async = require("async");
const moment = require("moment");
const videoModel = require('../model/mongoose').videoModel;
const saveVideo = require("../js/saveVideo");

//阴阳师的数据
let wzryVideo=(url)=> {
    superagent.get(url).end(function (err, sres) {
        if (err) {
            console.log("打印错误日志：" + err);
            return next(err);
        }
        //decodeEntities: false这个很重要，否则乱码
        let $ = cheerio.load(sres.text, {decodeEntities: false});
        let urls = [];
        let titles = [];
        let imgUrls = [];
        let videoTimes=[];
        let condition = {};
        async.forEachOf($('.v'), function (element, idx, callback) {
            let $element = $(element);
            //title
            let title = $element.find('.v-link>a').attr('title');
            //判断内容是否重复
            condition["describe.title"] = title;
            //查询数据库，进行比对
            videoModel.find(condition, function (err, results) {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else if (results.length == 0) {
                    urls.push($element.find('.v-link>a').attr('href'));
                    titles.push(title);
                    imgUrls.push($element.find('.v-thumb>img').attr('src'));
                    videoTimes.push($element.find('.v-time').text());
                    callback()
                } else {
                    console.log('本次爬取视频数据已经存在'+new Date().getFullYear() + '-' +
                        (new Date().getMonth() + 1) + '-' +
                        new Date().getDate() + ' ' +
                        new Date().getHours() + ':' +
                        new Date().getMinutes());
                    callback()
                }
            });
        }, function (err) {
            if (err) {
                return console.log(err)
            }
            //调用抓取详细内容方法
            details(urls, titles, imgUrls,videoTimes);
        });
    });
}

let details=(url, titles, imgUrls,videoTimes)=> {
    for (let i = 0; i < url.length; i++) {
        superagent.get(url[i]).end(function (err, sres) {
            if (err) {
                console.log("打印错误日志：" + err);
                return next(err);
            }
            let $ = cheerio.load(sres.text, {decodeEntities: false});
            //获取标题
            let titleContent = titles[i];
            let imgUrl = imgUrls[i];
            let videoTime=videoTimes[i];
            //作者
            let keywords = $('head>meta[name="keywords"]').attr('content');
            let description = $('head>meta[name="description"]').attr('content');
            $('#link4').each(function (idx, element) {
                let $element = $(element);
                // 获取内容
                // 存入数据库 标题，作者，内容，时间，条数
               let videoUrl=$element.val();
                let cFrom = '优酷';
                let gameName='王者荣耀';
                saveVideo(titleContent, imgUrl, videoUrl,videoTime,gameName, i, cFrom, keywords, description)
            });
        });
    }
}

module.exports = wzryVideo;
const mongoose = require('mongoose');
const videoSchema = require('./video');
//将mongoose的Promise方法于node的Promise方法互换，否则报错，但无关紧要
mongoose.Promise=global.Promise;
//连接数据库
mongoose.connect( '127.0.0.1:27017/article', {server: {poolSize: 20}},  (err)=> {//本地测试库
    if (err) {
        console.log('数据库连接失败');
        console.log(err);
        return process.exit(1);
    }
});
mongoose.connection.on('connected',  ()=> {
    console.log('数据库连接成功'+new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1) + '-' +
        new Date().getDate() + ' ' +
        new Date().getHours() + ':' +
        new Date().getMinutes());
});

exports.videoModel=mongoose.model('VideoLibrary',videoSchema,'VideoLibrary');
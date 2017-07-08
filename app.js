const schedule = require("node-schedule");
const wzryVideo = require("./js/wzryVideo");

//设置定时器
let ten = new schedule.RecurrenceRule();
ten.dayOfWeek = [0, new schedule.Range(1, 6)];
ten.hour = [0,2,4,6,8,10,14,16,18,20,22,24];
ten.minute=[20];

//执行定时器
// schedule.scheduleJob(ten, function () {
    wzryVideo('http://www.soku.com/search_video/q_%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80_limitdate_0?site=14&_lg=10&orderby=2&spm=a2h0k.8191407.0.0')
// });

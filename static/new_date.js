function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;

    return currentdate;


};

var func = {

    // 把时间戳转化为标准时间
    toData: function(date) {
        if (date == null) {
            return "";
        }
        var ndate = new Date(date);
        var Y = ndate.getFullYear() + '-';
        var M = (ndate.getMonth() + 1 < 10 ? '0' + (ndate.getMonth() + 1) : ndate.getMonth() + 1) + '-';
        var D = (ndate.getDate() < 10 ? '0' + (ndate.getDate()) : ndate.getDate()) + '-';
        var h = (ndate.getHours() < 10 ? '0' + (ndate.getHours()) : ndate.getHours()) + ':';
        var m = (ndate.getMinutes() < 10 ? '0' + (ndate.getMinutes()) : ndate.getMinutes()) + ':';
        var s = (ndate.getSeconds() < 10 ? '0' + (ndate.getSeconds()) : ndate.getSeconds());
        ndate = Y + M + D + h + m + s;
        return ndate;
    },

    // 获取 n 天之前的函数
    requireDate: function(day) {
        var dateGap = new Date().getTime() - day * 24 * 60 * 60 * 1000;
        var oldDate = new Date(dateGap);
        var date = {
            Y: oldDate.getFullYear() + '-',
            M: (oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1) + '-',
            D: (oldDate.getDate() < 10 ? '0' + (oldDate.getDate()) : oldDate.getDate()) + '',
        }
        var newDate = date.Y + date.M + date.D;
        //console.log(date);
        return newDate;
    },
    requireDate1: function(day) {
        var dateGap = new Date().getTime() - day * 24 * 60 * 60 * 1000;
        var oldDate = new Date(dateGap);
        var date = {
            Y: oldDate.getFullYear() + '-',
            M: (oldDate.getMonth() + 1 < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1),
            D: (oldDate.getDate() < 10 ? '0' + (oldDate.getDate()) : oldDate.getDate()) + '',
        }
        var newDate = date.Y + date.M;
        //console.log(date);
        return newDate;
    },
    // 日期去横杠
    toStr: function(str) {
        return str.split('-').join('');
    }
}
// console.log(func.requireDate(0));
// console.log(func.requireDate(7));

// var timestamp = Date.parse(new Date());
// var new_date1 = func.toData(timestamp)
// console.log(new_date1)
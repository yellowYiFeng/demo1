/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-01-19 17:01:31
 * @version $Id$
 */

 var clueStatus = (data) => {
    return {
            "0" : {"status":'待分配',"color":'warning' },
            "1" : {"status":'待处理',"color":'danger' },
            "2" : {"status":'跟进中',"color":'navy' },
            "-1" : {"status":'主动退回',"color":'info' },
            "-2" : {"status":'被动退回',"color":'primary' },
            "3" : {"status":'处理完毕',"color":'warning' }
        }[data];
}
var getClueSource = (data) => {
    return {
        "0" : "",
        "1" : "转出",
        "2" : "导入随机分配",
        "3" : "手动添加分配",
        "4" : "线索池秒杀"
    }[data];
}
var formatDate = (date, fmt) => {
    if(date){
        date = new Date(date);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    }
   
    
}
var padLeftZero = (str) => {
    return ('00' + str).substr(str.length);
}
var getMethod = (data) => {
    return {
            "0" : "",
            "1" : "转出",
            "2" : "导入随机分配",
            "3" : "手动添加分配",
            "4" : "线索池秒杀"
        }[data];
}
var getSex = (data) => {
    return {"-1" : "女", "1" : "男", "0" : ""}[data];
}
export{ 
   clueStatus,
   getClueSource,
   formatDate,
   getMethod,
   getSex
}
'use strict';
var moment = require('moment');
let tools = {};
/** 
 * 随机一个范围内的数字
 * @function 
 * @param {number} min
 * @param {number} max
 */
tools.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
/**
 * 数字补零
 * @function zeroPadding
 * @param {number} num 输入数字
 * @param {number} n 需要补足到的位数
 */
tools.zeroPadding = function (tbl) {
    return function (num, n) {
        return (0 >= (n = n - num.toString().length)) ? num.toString() : (tbl[n] || (tbl[n] = Array(n + 1).join('0'))) + num.toString();
    };
}([]);
/** 
 * 随机一个长度的字符串
 * @function 
 * @param {number} len
 */
tools.getRandomString = function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};
/**
 * 检查必要的参数
 * @function
 * @param {object} obj
 * @param {Array} params
 * @returns {Array} lostParams
 */
tools.checkParams = function (obj, params) {
    var lostParams = [];
    for (var i = 0; i < params.length; i++) {
        if (obj[params[i]] == null) {
            lostParams.push(params[i]);
        }
    }
    return lostParams;
}
/**
 * 将数据转换成string
 * @function
 * @param {Array} params
 * @param {String}  delimiter
 * @returns {String} ret
 */
tools.joinArray = function (params, delimiter) {
    var ret = '';
    delimiter = delimiter || ',';
    for (var i = 0; i < params.length; i++) {
        ret = ret + params[i] + delimiter;
    }
    return ret;
}

/**
 * 选取一个obj的一部分key组成另一个obj
 * @function
 * @param {Object} obj
 * @param {Array}  keys
 * @returns {Object} ret
 */
tools.subObject = function (obj, keys) {
    var ret = {};
    for (var i = 0; i < keys.length; i++) {
        ret[keys[i]] = obj[keys[i]];
    }
    return ret;
}

/**
 * 获得毫秒时间戳
 */
tools.getMilliSecond = function () {
    return moment().unix() + moment().milliseconds();
}

module.exports = tools;
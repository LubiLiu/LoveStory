'use strict';
var _ = require('lodash');

const ERROR = function (code, status, msg, ...params) {
    if (params != null && params.length > 0) {
        _.forEach(params, function (param, index) {
            msg = msg.replace('{' + index + '}', param);
        });
    }

    return { code, status, msg };
};
module.exports = {
    // 内部错误(比较严重的服务器错误)
    INTER_ERROR: function (err) {
        return ERROR('INTER_ERROR', 500, '内部错误:{0}', err);
    },
    // 数据库错误(用于数据库 增删改查失败后的错误)
    DB_ERROR: function (err) {
        return ERROR('DB_ERROR', 500, '数据库错误:{0}', err);
    },
    // 请求参数错误(请求的参数传递有误)
    PARAM_LOST: function (name) {
        return ERROR('PARAM_LOST', 400, '缺失参数:{0}', name);
    },

    PLAYER_EXISTED: function (phone) {
        return ERROR('PLAYER_EXISTED', 400, '玩家已存在:{0}', phone);
    },
    NO_VALIDATION: function (phone, type) {
        return ERROR('NO_VALIDATION', 400, '验证码不存在:{0} {1}', phone, type);
    },
    VALIDATION_ERROR: function (phone, type, validation) {
        return ERROR('VALIDATION_ERROR', 400, '验证码错误:{0} {1} {2}', phone, type, validation);
    },
    VALIDATION_TIMEOUT: function () {
        return ERROR('VALIDATION_TIMEOUT', 400, '验证码超时');
    },
    NO_PLAYER: function (phone) {
        return ERROR('NO_PLAYER', 400, '没有该玩家: {0}', phone);
    },
    PASSWORD_ERROR: function (phone, pass) {
        return ERROR('PASSWORD_ERROR', 400, '密码错误 {0} {1}', phone, pass);
    },
    LOGININFO_ERROR: function () {
        return ERROR('LOGININFO_ERROR', 400, '请先登录');
    },
    TOKEN_ERROR: function () {
        return ERROR('TOKEN_ERROR', 400, 'TOKEN错误');
    }
};
'use strict';
var async = require('async');
var moment = require('moment');

var define = require('../../Common/define');
var tools = require('../../Common/tools');
var error = require('../../Common/error');
var token = require('../../Common/token');
var httpUtil = require('../../Common/httpUtil');
let config = require('../../Common/config');

var serverConf = config.getConfig('server.json');
var validation = require('../../DataBase/schema/validation');
var player = require('../../DataBase/schema/player');
let PlayerController = function () {
    this.name = 'PlayerController';
}

/**
 * 请求发送验证码
 * @param {Object} req 
 * @param {Object} res 
 */
PlayerController.prototype.onSendValidation = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['phone', 'vtype']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let value = tools.zeroPadding(tools.getRandomInt(0, 1000000), 6);
    let phone = req.body.phone, vtype = req.body.vtype, createtime = tools.getMilliSecond();
    validation.update({ phone, vtype }, { phone, vtype, value, createtime }, { upsert: true }, function (err) {
        if (err) {
            return res.sendError(error.DB_ERROR(err));
        } else {
            //TODO 正式的应该要去掉
            res.sendSuccess({ phone, vtype, value, createtime });
        }
    });
}
/**
 * 使用手机注册
 * @param {Object} req 
 * @param {Object} res 
 */
PlayerController.prototype.onRegisterByPhone = function (req, res) {
    let lostParams = Util.checkParams(req.body, ['phone', 'password', 'validation', 'serverName']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let phone = req.body.phone, password = req.body.password, validation = req.body.validation, serverName = req.body.serverName;
    async.waterfall([
        function (anext) {
            //用户检查
            player.find({ phone }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos.length > 0) {
                    return anext(error.PLAYER_EXISTED(phone));
                }
                anext();
            });
        },
        function (anext) {
            validation.find({ phone, vtype: define.ValidationType.Registe }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos == null && infos.length == 0) {
                    return anext(error.NO_VALIDATION(phone, define.ValidationType.Registe));
                }
                let info = infos[0];
                if (validation != info.value) {
                    return anext(error.VALIDATION_ERROR(phone, define.ValidationType.Registe, validation));
                }
                if (moment().unix() - info.createtime > define.ServerCommon.ValidationTimeout) {
                    return anext(error.VALIDATION_TIMEOUT());
                }
                //判定成功了吧
                anext();
            });
        },
        function (anext) {
            //TODO 检查GameServer
            // httpUtil.HTTPPost(serverConf.gateserver, 'getGameServer', {
            //     serverName: serverName,
            // }, function (info) {
            //     logger.info('[网关消息] 注册网关成功 ' + serverConf.name);
            // }, function (err) {
            //     logger.error('[网关错误] 注册到网关失败 ' + serverConf.name);
            // });
            anext();
        },
        function (anext) {
            let playerInfo = { phone, password, serverName };
            let tokenInfo = token.createToken(playerInfo);
            playerInfo.token = tokenInfo;
            player.create(playerInfo, function (err, reuslts) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                } else {
                    anext(null, reuslts[0]);
                }
            });
        },
    ], function (err, result) {
        if (err) {
            res.sendError(err);
        } else {
            res.sendSuccess(result);
        }
    });
}
/**
 * 用手机验证码快速登录
 * @param {Object} req 
 * @param {Object} res 
 */
PlayerController.prototype.onQuickLoginByPhone = function (req, res) {
    let lostParams = Util.checkParams(req.body, ['phone', 'validation']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let phone = req.body.phone, validation = req.body.validation;
    async.waterfall([
        function (anext) {
            //检查验证码
            validation.find({ phone, vtype: define.ValidationType.QuickLogin }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos == null && infos.length == 0) {
                    return anext(error.NO_VALIDATION(phone, define.ValidationType.Registe));
                }
                let info = infos[0];
                if (validation != info.value) {
                    return anext(error.VALIDATION_ERROR(phone, define.ValidationType.Registe, validation));
                }
                if (moment().unix() - info.createtime > define.ServerCommon.ValidationTimeout) {
                    return anext(error.VALIDATION_TIMEOUT());
                }
                //判定成功了吧
                anext();
            });
        },
        function (anext) {
            //加载玩家
            player.find({ phone }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos.length <= 0) {
                    return anext(error.NO_PLAYER(phone));
                }
                anext(infos[0]);
            });
        },
        function (playerInfo, anext) {
            //加载成功 生成token
            let subPlayer = tools.subObject(playerInfo, ['phone', 'password', 'serverName']);
            let tokenInfo = token.createToken(subPlayer);
            player.update({ _id: playerInfo._id }, { $set: { token: tokenInfo } }, function (err) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                } else {
                    playerInfo.token = tokenInfo;
                    return anext(null, playerInfo);
                }
            });
        },
    ], function (err, result) {
        if (err) {
            res.sendError(err);
        } else {
            res.sendSuccess(result);
        }
    });
}

/**
 * 使用手机号密码登录
 * @param {Object} req 
 * @param {Object} res 
 */
PlayerController.prototype.onLoginByPhonePass = function (req, res) {
    let lostParams = Util.checkParams(req.body, ['phone', 'password']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let phone = req.body.phone, password = req.body.password;
    async.waterfall([
        function (anext) {
            //加载玩家出来
            player.find({ phone }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos.length <= 0) {
                    return anext(error.NO_PLAYER(phone));
                }
                let playerInfo = infos[0];
                if (playerInfo.password != password) {
                    return anext(error.PASSWORD_ERROR(phone, password));
                }
                anext(infos[0]);
            });
        },
        function (playerInfo, anext) {
            //加载成功 生成token
            let subPlayer = tools.subObject(playerInfo, ['phone', 'password', 'serverName']);
            let tokenInfo = token.createToken(subPlayer);
            player.update({ _id: playerInfo._id }, { $set: { token: tokenInfo } }, function (err) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                } else {
                    playerInfo.token = tokenInfo;
                    return anext(null, playerInfo);
                }
            });
        }
    ], function (err, result) {
        if (err) {
            res.sendError(err);
        } else {
            res.sendSuccess(result);
        }
    });
}

module.exports = new PlayerController();
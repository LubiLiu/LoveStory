'use strict';
var async = require('async');
var moment = require('moment');
var mongoose = require('mongoose');

var define = require('../../Common/define');
var tools = require('../../Common/tools');
var error = require('../../Common/error');
var token = require('../../Common/token');
var httpUtil = require('../../Common/httpUtil');

var validation = require('../../DataBase/schema/validation');
var player = require('../../DataBase/schema/player');
let PlayerController = function () {
    this.name = 'PlayerController';
}

/**
 * 进入游戏服务器
 * @param {Object} req 
 * @param {Object} res 
 */
PlayerController.prototype.onEnterGame = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['_id', 'token']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let _id = req.body._id, tokenInfo = req.body.token;
    async.waterfall([
        function (anext) {
            if (token.checkToken(tokenInfo)) {
                anext();
            } else {
                anext(error.TOKEN_ERROR());
            }
        },
        function (anext) {
            //检查玩家
            player.find({ _id: mongoose.Types.ObjectId(_id) }, function (err, infos) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                if (infos.length == 0) {
                    return anext(error.NO_PLAYER(_id));
                }
                let playerInfo = infos[0];
                if (playerInfo.token != tokenInfo) {
                    return anext(error.TOKEN_ERROR());
                }
                req.session.player = playerInfo;
                anext(null, playerInfo);
            });
        },
        function (playerInfo, anext) {
            //更新token
            let subInfo = tools.subObject(playerInfo, ['phone', 'password', 'serverName']);
            let tokenInfo = token.createToken(subInfo);
            player.update({ _id: mongoose.Types.ObjectId(_id) }, {
                $set: { token: tokenInfo }
            }, function (err) {
                if (err) {
                    return anext(error.DB_ERROR(err));
                }
                req.session.player.token = tokenInfo;
                anext(null, {});
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
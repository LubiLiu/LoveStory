'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');

var error = require('../../Common/error');
var tools = require('../../Common/tools');
var token = require('../../Common/token');

var player = require('../../DataBase/schema/player');

let PlayerMiddleware = function () {
    this.name = 'PlayerMiddleware';
}

PlayerMiddleware.prototype.checkToken = function (req, res, next) {
    let condition = _.merge(req.body, req.query);
    let lostParams = tools.checkParams(condition, ['_id']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    };
    if (req.session.player == null) {
        return res.sendError(error.LOGININFO_ERROR());
    } else {
        if (token.checkToken(req.session.player.token)) {
            //有效 刷新token
            let playerInfo = tools.subObject(req.session.player, ['phone', 'password', 'serverName']);
            let tokenInfo = token.createToken(playerInfo);
            player.update({ _id: mongoose.Types.ObjectId(condition._id) }, {
                $set: { token: tokenInfo }
            }, function (err) {
                if (err) {
                    return res.sendError(error.DB_ERROR(err));
                }
                req.session.player.token = tokenInfo;
                next();
            });
        } else {
            //无效 重新登录 
            res.sendError(error.LOGININFO_ERROR());
        }
    }
}


module.exports = new PlayerMiddleware();
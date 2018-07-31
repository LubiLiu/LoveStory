'use strict';
var serverModel = require('../../model/serverModel');

var define = require('../../../Common/define');
var tools = require('../../../Common/tools');
var error = require('../../../Common/error');
let GameServerController = function () {
    this.name = 'GameServerController';
}

GameServerController.prototype.onAddServer = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['name', 'ip', 'port', 'key']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    serverModel.addServer(req.body.name, define.ServerType.TypeGame, req.body.ip, req.body.port, req.body.key);
    res.sendSuccess();
}

GameServerController.prototype.onPauseServer = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['name']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    serverModel.pauseServer(req.body.name, define.ServerType.TypeGame);
    res.sendSuccess();
}

module.exports = new GameServerController();
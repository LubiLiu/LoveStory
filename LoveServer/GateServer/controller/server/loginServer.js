'use strict';
var serverModel = require('../../model/serverModel');

var define = require('../../../Common/define');
var tools = require('../../../Common/tools');
var error = require('../../../Common/error');
let LoginServerController = function () {
    this.name = 'LoginServerController';
}

LoginServerController.prototype.onAddServer = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['name', 'ip', 'port', 'key']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    serverModel.addServer(req.body.name, define.ServerType.TypeLogin, req.body.ip, req.body.port, req.body.key);
    res.sendSuccess();
}

LoginServerController.prototype.onPauseServer = function (req, res) {
    let lostParams = tools.checkParams(req.body, ['name']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    serverModel.pauseServer(req.body.name, define.ServerType.TypeLogin);
    res.sendSuccess();
}

module.exports = new LoginServerController();
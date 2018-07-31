'use strict';
var express = require('express');

var serverModel = require('../model/serverModel');
var tools = require('../../Common/tools');
var define = require('../../Common/define');
var error = require('../../Common/error');
var router = express.Router();

router.get('/player/getAllLoginServer', function (req, res, next) {
    let serverInfo = serverModel.randomServer(define.ServerType.TypeLogin);
    res.sendSuccess(serverInfo);
});

router.get('/player/getGameServer', function (req, res, next) {
    let lostParams = tools.checkParams(req.query, ['serverName']);
    if (lostParams.length > 0) {
        return res.sendError(error.PARAM_LOST(tools.joinArray(lostParams, ',')));
    }
    let server = serverModel.findServer(define.ServerType.TypeGame, req.query.serverName);
    res.sendSuccess(server);
});

router.get('/player/getAllGameServer', function (req, res, next) {
    let servers = serverModel.getServers(define.ServerType.TypeGame);
    res.sendSuccess(servers);
});

module.exports = router;
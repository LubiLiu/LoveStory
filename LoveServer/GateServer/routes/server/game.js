'use strict';
var express = require('express');

var controller = require('../../controller/index');
var router = express.Router();

router.post('/gameServer/addServer', controller.GameServerController.onAddServer);
router.post('/gameServer/pauseServer', controller.GameServerController.onPauseServer);

module.exports = router;
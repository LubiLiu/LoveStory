'use strict';
var express = require('express');
var controller = require('../../controller/index');
var router = express.Router();

router.post('/loginServer/addServer', controller.LoginServerController.onAddServer);
router.post('/loginServer/pauseServer', controller.LoginServerController.onPauseServer);

module.exports = router;
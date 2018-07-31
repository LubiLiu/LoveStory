'use strict';
var express = require('express');

var controller = require('../controller/index');
var define = require('../../Common/define');
var router = express.Router();

router.post('/player/enterGame', controller.PlayerController.onEnterGame);

module.exports = router;
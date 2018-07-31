'use strict';
var express = require('express');

var controller = require('../controller/index');
var define = require('../../Common/define');
var router = express.Router();

router.post('/player/sendValidation', controller.PlayerController.onSendValidation);
router.post('/player/registerByPhone', controller.PlayerController.onRegisterByPhone);
router.post('/player/quickLoginByPhone', controller.PlayerController.onQuickLoginByPhone);
router.post('/player/loginByPhonePass', controller.PlayerController.onLoginByPhonePass);

module.exports = router;
'use strict';
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let logger = require('../Common/logger');
let define = require('../Common/define');
let config = require('../Common/config');
let loggerConfig = config.getConfig('log.json');
let dbConfig = config.getConfig('db.json');
logger.generator(loggerConfig);
let db = require('../Common/db');
db.generator(dbConfig);
let routes = require('./routes/index');

let app = express();
// view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//初始化路由
routes.Initialization(app);

module.exports = app;

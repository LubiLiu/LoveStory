'use strict';
var express = require('express');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

var define = require('../../Common/define');
var tools = require('../../Common/tools');
var app = require('../app');
let logger = require('../../Common/logger').getLogger();

var router = express.Router();
let routes = {};

routes.LoadRoute = function (app, filePath) {
    let stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        let dirs = fs.readdirSync(filePath);
        dirs.forEach(function (ele, index) {
            let newFileName = path.join(filePath, ele);
            routes.LoadRoute(app, newFileName);
        });
    } else if (stat.isFile()) {
        if (path.resolve(__filename) == path.resolve(filePath)) {
            return;
        }
        let router = require(filePath);
        app.use(router);
    }
}

/**
 * 初始化路由
 * @param {Express} app 
 */
routes.Initialization = function (app) {
    //处理请求前操作
    app.use(function (req, res, next) {
        req.id = tools.getRandomString();
        req.start_time = tools.getMilliSecond();
        logger.info(tools.subObject(req, ['body', 'id', 'start_time', 'method', 'url']), '[请求开始]');
        next();
    });
    app.use(function (req, res, next) {
        /**
         * 通用返回错误接口
         */
        res.sendError = function (err) {
            let code = err.code || 'UNDEFINED_ERR';
            let msg = err.msg || 'undefined server error.';
            let status = err.status || 500;
            let result = { error_code: code, error_msg: msg };
            logger.warn(_.merge(result, { status: status, id: req.id, processTime: tools.getMilliSecond() - req.start_time }), '[请求错误]');
            return res.status(status).send(result);
        };
        res.sendSuccess = function (result) {
            result = result || {};
            logger.info(_.merge(_.cloneDeep(result), { id: req.id, processTime: tools.getMilliSecond() - req.start_time }), '[请求成功]');
            res.status(200).send(result);
        };
        next();
    });
    app.use("*", function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.get('Origin'));
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", 'true');
        if (req.method === 'OPTIONS') {
            res.send(200)
        } else {
            next();
        }
    });

    //处理请求
    var root = path.join(__dirname);
    this.LoadRoute(app, root);
    //处理请求后
    app.get('/', function (req, res) {
        res.send('welcom to Love Girl\'s world.' + app.get(define.DataKey.ServerName));
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        logger.warn({ id: req.id, processTime: tools.getMilliSecond() - req.start_time }, '[请求失败]');
        res.sendStatus(404);
    });
}

module.exports = routes;

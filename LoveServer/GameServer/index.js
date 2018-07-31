'use strict';
let http = require('http');
let config = require('../Common/config');
config.init(process.env.CONFIG_PATH);
let app = require('./app');
let define = require('../Common/define');
let httpUtil = require('../Common/httpUtil');
let serverConf = config.getConfig('server.json');
let logger = require('../Common/logger').getLogger();
app.set(define.DataKey.ServerName, serverConf.name);
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    logger.error(error, '[监听错误]');
    process.exit(1);
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    //注册到gate服务器
    httpUtil.HTTPPost(serverConf.gateserver, 'addGameServer', {
        name: serverConf.name,
        ip: serverConf.host,
        port: serverConf.port,
        key: ''
    }, function (info) {
        logger.info('[网关消息] 注册网关成功 ' + serverConf.name);
    }, function (err) {
        logger.error('[网关错误] 注册到网关失败 ' + serverConf.name);
    });
}


let server = http.createServer(app);

server.listen(serverConf.port);
server.on('error', onError);
server.on('listening', onListening);


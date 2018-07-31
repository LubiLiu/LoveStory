'use strict';
let http = require('http');
let config = require('../Common/config');
config.init(process.env.CONFIG_PATH);

let app = require('./app');
let define = require('../Common/define');
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
}


let server = http.createServer(app);

server.listen(serverConf.port);
server.on('error', onError);
server.on('listening', onListening);


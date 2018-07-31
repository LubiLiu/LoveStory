'use strict';
var bunyan = require('bunyan');
var path = require('path');
let logger = function () {
    this._log = null;//bunyan.createLogger({});
}
logger.prototype.generator = function (config) {
    let streams = [];
    for (let i = 0; i < config.streams.length; i++) {
        let stream = {
            type: config.streams[i].type,
            level: config.streams[i].level,
            path: path.join(__dirname, config.path, config.streams[i].name),
            period: config.streams[i].period,
            count: config.streams[i].count,
        }
        streams.push(stream);
    }

    let opts = {
        name: config.name,
        serializers: {
            req: bunyan.stdSerializers.req,
            res: bunyan.stdSerializers.res,
            err: bunyan.stdSerializers.err
        },
        streams: streams
    };

    this._log = bunyan.createLogger(opts);
}

logger.prototype.getLogger = function () {
    return this._log;
}
module.exports = new logger();
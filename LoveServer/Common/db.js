'use strict';

var mongoose = require('mongoose');
var logger = require('./logger').getLogger();

let db = function () {
    this.client = null;
}
db.prototype.generator = function (config) {
    this.client = mongoose.createConnection('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
    this.client.on('error', function (error) {
        logger.error(error, '[数据库错误]');
    });
    this.client.on('connected', function () {
        logger.info('[数据库链接成功]');
    });
}

/**
 * export scheme
 * @param {String} name 
 * @param {Object} scheme 
 */
db.prototype.model = function (name, scheme) {
    if (this.client == null) {
        logger.error('[数据库错误] 数据库尚未准备好 ' + name);
        return null;
    }
    return this.client.model(name, scheme);
};

module.exports = new db();

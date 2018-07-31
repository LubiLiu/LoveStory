'use strict';
var _ = require('lodash');

var define = require('../../Common/define');
var tools = require('../../Common/tools');
let logger = require('../../Common/logger').getLogger();

let ServerInfo = function (name, type, ip, port, key) {
    this.name = name;
    this.ip = ip;
    this.port = port;
    this.type = type;
    this.status = define.ServerStatus.StatusRunning;
    this.privateKey = key;
}

let ServerModel = function () {
    this.loginServers = {};
    this.gameServers = {};
    this.interval = setInterval(this.tick.bind(this), define.ServerCommon.TickInterval);
};
//对外接口
/**
 * 新注册一个服务器  非gateServer启动后请求
 * @param {String} name 
 * @param {Number} type 
 * @param {String}} ip 
 * @param {Number} port 
 */
ServerModel.prototype.addServer = function (name, type, ip, port, key) {
    let serverInfo = new ServerInfo(name, type, ip, port, key);
    switch (type) {
        case define.ServerType.TypeLogin:
            {
                this.loginServers[name] = serverInfo;
            }
            break;
        case define.ServerType.TypeGame:
            {
                this.gameServers[name] = serverInfo;
            }
            break;
        default:
            logger.error(serverInfo, '[服务器错误]', '没有该类型的服务器');
            break;
    }
}
/**
 * 服务器暂停，当一个服务器维护的时候发送
 * @param {String} name 
 * @param {Number} type 
 */
ServerModel.prototype.pauseServer = function (name, type) {
    let servers = this.getServers(type);
    let server = servers[name];
    if (server == null) {
        logger.error('[服务器错误]', '没有该名字的服务器 ' + name);
        return;
    }
    server.status = define.ServerStatus.StatusPause;
}

ServerModel.prototype.randomServer = function (type) {
    let servers = this.getServers(type);
    let serverlist = _.values(servers);
    if (serverlist.length <= 0) {
        logger.error('[服务器错误]', '没有该类型可用的服务器 ' + type);
        return null;
    }
    return serverlist[tools.getRandomInt(0, serverlist.length)];
}

ServerModel.prototype.findServer = function (type, name) {
    let servers = this.getServers(type);
    let server = servers[name];
    if (server == null) {
        logger.error('[服务器错误]', '没有该名字的服务器 ' + name);
    }
    return server;
}

//内部私有函数

/**
 * 获得一个类型的服务器列表
 * @param {Number} type 
 */
ServerModel.prototype.getServers = function (type) {
    let servers = {};
    switch (type) {
        case define.ServerType.TypeLogin:
            {
                servers = this.loginServers;
            }
            break;
        case define.ServerType.TypeGame:
            {
                servers = this.gameServers;
            }
            break;
        default:
            logger.error('[服务器错误]', '没有该类型的服务器 ' + type);
            break;
    }
    return servers;
}
/**
 * 心跳检测服务器的tick
 */
ServerModel.prototype.tick = function () {
    //心跳检测服务器状态
    this.checkServers(this.loginServers);
    this.checkServers(this.gameServers);
}
/**
 * 检查一个服务器列表
 * @param {Object} servers 
 */
ServerModel.prototype.checkServers = function (servers) {
    for (let key in servers) {
        let server = servers[key];
        if (server.status == define.ServerStatus.StatusRunning || server.status == define.ServerStatus.StatusDown) {
            this.checkServer(server);
        }
    }
}
/**
 * 检查一个服务器
 * @param {Object} server 
 */
ServerModel.prototype.checkServer = function (server) {
    //TODO httpRequest
}

module.exports = new ServerModel();
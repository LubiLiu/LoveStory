let path = require('path');
let Config = function () {
    this.filePath = '';
    this.configs = {};
}

Config.prototype.init = function (path) {
    this.filePath = path;
}

Config.prototype.getConfig = function (name) {
    let config = this.configs[name];
    if (config == null) {
        let filePath = path.join(this.filePath, name);
        config = require(filePath);
        this.configs[name] = config;
    }
    return config;
}
module.exports = new Config();